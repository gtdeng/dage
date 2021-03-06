import fetch from 'isomorphic-fetch';
import request from '../_config/superagent';

import {
  FILTER_ARRAY_FETCH,
  FILTER_ARRAY_REQUEST,
  FILTER_ARRAY_FETCH_SUCCESS,
  FILTER_ARRAY_FETCH_ERROR,

  FILTER_TYPE_SELECT,

  FILTER_TYPE_ADD,
  FILTER_TYPE_POST_SUCCESS,
  FILTER_TYPE_POST_REQUEST,
  FILTER_TYPE_POST_ERROR,

  FILTER_ADD_FLAG_KEYWORD,
  FILTER_FLAG_POST_SUCCESS,
  FILTER_FLAG_POST_REQUEST,
  FILTER_FLAG_POST_ERROR,

  FILTER_REMOVE_FLAG_KEYWORD,
  FILTER_FLAG_REMOVE_SUCCESS,
  FILTER_FLAG_REMOVE_REQUEST,
  FILTER_FLAG_REMOVE_ERROR,
} from 'constants/filters';

export function filterArrayFetch() {
  return dispatch => {
    dispatch(filterArrayRequest());
    return fetch('http://localhost:4000/filterData')
      .then(req => { return req.json() })
      .then(json => { dispatch(filterArrayFetchSuccess(json)) })
  }
}

export function filterArrayRequest() {
  return { type: FILTER_ARRAY_REQUEST };
}

export function filterArrayFetchSuccess(filtersArray) {
  return {
    type: FILTER_ARRAY_FETCH_SUCCESS,
    payload: {
      filtersArray,
      receivedt: Date.now(),
    }
  }
}

export function filterArrayFetchError(error) {
  return {
    type: FILTER_ARRAY_FETCH_ERROR,
    payload: { error },
  }
}

export function filterTypeSelect(filterId) {
  return {
    type: FILTER_TYPE_SELECT,
    payload: { filterId },
  }
}

export function filterTypeAdd(filterName, username){
  return dispatch => {
    dispatch(filterTypePostRequest());
    return request
      .post('http://127.0.0.1:4000/submitfilter')
      .send({username: username, filter:filterName})
      .end((err, res) => {
        if(err) {
          dispatch(filterTypePostError());
        }else {
          dispatch(filterTypePostSuccess(res.body.id, res.body.filterName));
        }
      })
    };
}

export function filterTypePostRequest(){
  return{
    type: FILTER_TYPE_POST_REQUEST,
  }
}

export function filterTypePostSuccess(filterId, filterName){
  return{
    type: FILTER_TYPE_POST_SUCCESS,
    payload:{
      filterId: filterId,
      filterName: filterName,
    }
  }
}

export function filterTypePostError(){
  return{
    type: FILTER_TYPE_POST_ERROR,
  }
}
export function filterAddFlagKeyword(username, filterId, keyword){
  return dispatch => {
    dispatch(filterFlagPostRequest());
    return request
      .post('http://127.0.0.1:4000/submitkeyword')
      .send({username: username,filterId: filterId,keyword:keyword})
      .end((err, res) => {
        if(err){
          dispatch(filterFlagPostError())
        }else{
          dispatch(filterArrayFetch());
          dispatch(filterFlagPostSuccess(res.body.keyword, res.body.keywordId))
        }
      });
  }
}

export function filterFlagPostRequest(){
  return {
    type: FILTER_FLAG_POST_REQUEST,
  }
}

export function filterFlagPostSuccess(newFlag, Id){
  return {
    type: FILTER_FLAG_POST_SUCCESS,
    payload:{
      label: newFlag,
      value: Id
    }
  }
}

export function filterFlagPostError(){
  return{
    type: FILTER_FLAG_POST_ERROR,
  }
}

export function filterRemoveFlagKeyword(username, filterId, keyword){
  return dispatch => {
    dispatch(filterFlagRemoveRequest());
    return request
      .post('http://127.0.0.1:4000/removekeyword')
      .send({username: username,filterId: filterId,keyword:keyword})
      .end((err, res) => {
        if(err){
          dispatch(filterFlagRemoveError())
          console.log('error')
        }else{
          dispatch(filterArrayFetch());
          dispatch(filterFlagPostSuccess())
          console.log('success')
        }
      });
  }
}

export function filterFlagRemoveRequest(){
  return {
    type:FILTER_FLAG_REMOVE_REQUEST
  }
}

export function filterFlagRemoveSuccess(){
  return{
    type:FILTER_FLAG_REMOVE_SUCCESS
  }
}

export function filterFlagRemoveError(){
  return{
    type:FILTER_FLAG_REMOVE_ERROR
  }
}
