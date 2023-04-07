import request from './request'
const question_bank_url = {
  question: '/question_bank',
}
export function CreateQuestionApi(parameter) {
  return request({
    url: question_bank_url.question,
    method: 'post',
    data: parameter,
  })
}
export function GetQuestionApi(params) {
  return request({
    url: question_bank_url.question,
    method: 'get',
    params,
  })
}
export function UpdateQuestionApi(id, parameter) {
  return request({
    url: question_bank_url.question + '/' + id,
    method: 'Patch',
    data: parameter,
  })
}
export function DeleteQuestionApi(id) {
  return request({
    url: `${question_bank_url.question}/${id}`,
    method: 'delete',
  })
}
