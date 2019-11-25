import asyncDataMixin from './client/asyncData'
import applyAsyncData from './client/applyAsyncData'

export const mixins = { client: [asyncDataMixin, applyAsyncData] }
