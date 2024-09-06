const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, cur) => acc + cur.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {}   
  } else {
    return blogs.reduce((max, cur) => cur.likes > max.likes ? cur : max, { ...blogs[0], likes:0 })
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  let authorBin = {}

  blogs.forEach(elem => {
    if (authorBin[`${elem.author}`] !== undefined) {
        authorBin[`${elem.author}`] += 1
    } else {
        authorBin[`${elem.author}`] = 1
    }
  })

  const author = Object.keys(authorBin).reduce((max, cur) => authorBin[cur] > authorBin[max] ? cur : max)
      
  return { 'author': author, 'blogs': authorBin[author] }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  let authorBin = {}

  blogs.forEach(elem => {
    if (authorBin[`${elem.author}`] !== undefined) {
        authorBin[`${elem.author}`] += elem.likes
    } else {
        authorBin[`${elem.author}`] = elem.likes
    }
  })

  const author = Object.keys(authorBin).reduce((max, cur) => authorBin[cur] > authorBin[max] ? cur : max)
      
  return { 'author': author, 'likes': authorBin[author] }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
