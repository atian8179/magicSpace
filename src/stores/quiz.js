import { defineStore } from 'pinia'
import { quizQuestions, talentTypes } from '../data/quizData'

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    answers: [], // 存储用户答案 [{questionId: 1, answerIndex: 0}, ...]
    currentQuestionIndex: 0,
    scores: {
      logic: 0,
      creativity: 0,
      space: 0,
      focus: 0,
      collaboration: 0,
      exploration: 0
    },
    result: null
  }),

  getters: {
    currentQuestion: (state) => quizQuestions[state.currentQuestionIndex],
    totalQuestions: () => quizQuestions.length,
    progress: (state) => ((state.currentQuestionIndex + 1) / quizQuestions.length) * 100,
    isCompleted: (state) => state.answers.length === quizQuestions.length
  },

  actions: {
    answerQuestion(answerIndex) {
      // 保存答案
      this.answers.push({
        questionId: quizQuestions[this.currentQuestionIndex].id,
        answerIndex
      })

      // 计算得分
      const question = quizQuestions[this.currentQuestionIndex]
      const selectedOption = question.options[answerIndex]

      // 累加各维度分数
      Object.entries(selectedOption.score).forEach(([dimension, score]) => {
        this.scores[dimension] += score
      })

      // 下一题
      if (this.currentQuestionIndex < quizQuestions.length - 1) {
        this.currentQuestionIndex++
      }
    },

    previousQuestion() {
      if (this.currentQuestionIndex > 0) {
        // 移除最后一个答案
        const lastAnswer = this.answers.pop()

        // 减去对应的分数
        const question = quizQuestions[this.currentQuestionIndex]
        const selectedOption = question.options[lastAnswer.answerIndex]

        Object.entries(selectedOption.score).forEach(([dimension, score]) => {
          this.scores[dimension] -= score
        })

        this.currentQuestionIndex--
      }
    },

    calculateResult() {
      // 找出得分最高的维度
      const sortedDimensions = Object.entries(this.scores).sort((a, b) => b[1] - a[1])

      // 根据最高分维度组合确定天赋类型
      const topDimension = sortedDimensions[0][0]
      const topScore = sortedDimensions[0][1]
      const secondScore = sortedDimensions[1][1]

      // 计算分数百分比（假设每题最高5分）
      const maxPossibleScore = this.answers.length * 0.4 // 每维度约4题，每题最高5分，但分散到各维度
      const normalizedScores = {}
      Object.entries(this.scores).forEach(([dim, score]) => {
        normalizedScores[dim] = Math.min(100, Math.round((score / maxPossibleScore) * 100))
      })

      // 根据维度组合确定天赋类型
      let talentIndex = 0
      const scoreDiff = topScore - secondScore

      if (topDimension === 'logic') {
        talentIndex = scoreDiff > 5 ? 0 : 3 // 逻辑探险家 或 未来发明家
      } else if (topDimension === 'creativity') {
        talentIndex = 1 // 创意魔法师
      } else if (topDimension === 'space') {
        talentIndex = this.scores.logic > this.scores.creativity ? 0 : 2
      } else if (topDimension === 'focus') {
        talentIndex = 5 // 专注工匠
      } else if (topDimension === 'collaboration') {
        talentIndex = 4 // 协作领航员
      } else if (topDimension === 'exploration') {
        talentIndex = 3 // 未来发明家
      }

      this.result = {
        talentType: talentTypes[talentIndex],
        scores: normalizedScores,
        topDimension,
        scoreBreakdown: sortedDimensions
      }

      return this.result
    },

    resetQuiz() {
      this.answers = []
      this.currentQuestionIndex = 0
      this.scores = {
        logic: 0,
        creativity: 0,
        space: 0,
        focus: 0,
        collaboration: 0,
        exploration: 0
      }
      this.result = null
    }
  }
})
