const posts=(state=[],action) =>{
  switch (action.type) {
    case 'GET_POSTS':
      return [].concat(action.posts)
    default:
      return state
  }
}
const user=(state='',action) =>{
  switch (action.type) {
    case 'GET_USER':
      return  action.user
    default:
      return state
  }
}

export {posts,user}
