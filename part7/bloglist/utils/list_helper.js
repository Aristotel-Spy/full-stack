//will be used as a module for testing.


const dummy = (blogsArray) => {

    return 1

}

const totalLikes = (blogsArray) =>{

    if(blogsArray.length === 0){
        return 0
    } else if (blogsArray.length === 1){

        return blogsArray[0].likes
    }

    const mappedArray = blogsArray.map(blog =>{

        return blog.likes
    })

    return mappedArray.reduce((sum,value)=>{
        return sum+value
    }) 
}

const favoriteBlog = (blogsArray) =>{

    if(blogsArray.length === 0){
        return null
    } else if (blogsArray.length === 1){
        const blog = blogsArray[0]

        const trimmedBlog = {title:blog.title,author:blog.author,likes:blog.likes}

        return trimmedBlog
    }

    let maxLikes = blogsArray[0].likes
    let blog = blogsArray[0]

    for(const b of blogsArray){

        if(b.likes > maxLikes){
            maxLikes = b.likes
            blog = b
        }
    }

    const trimmedBlog = {title:blog.title,author:blog.author,likes:blog.likes}

    return trimmedBlog


}

const mostBlogs = (blogsArray) =>{

    if(blogsArray.length === 0){
        return null
    } else if (blogsArray.length === 1){

        return {author:blogsArray[0].author,blogs:1}
    }

    //create an object similar to a python dic
    //which will take as keys the names of the authors and as values their blog number.
    const authors = {}

    for(const b of blogsArray){
        authors[b.author] = 0
    }
    
    
    for(const b of blogsArray){
    
        authors[b.author]+=1
    
    }
    
    let max = 0
    let n = ''
    
    for(const Name in authors){
        
        if(authors[Name] > max){
            max = authors[Name]
            n = Name
        }
    }

    return {author:n,blogs:max}
}

const mostLikes = (blogsArray) =>{

    if(blogsArray.length === 0){
        return null
    } else if (blogsArray.length === 1){

        return {author:blogsArray[0].author,likes:blogsArray[0].likes}
    }

    const authors = {}

    for(const b of blogsArray){
        authors[b.author] = 0
    }
    
    
    for(const b of blogsArray){
    
        authors[b.author]+=b.likes
    
    }
    
    let max = 0
    let n = ''
    
    for(const Name in authors){
        
        if(authors[Name] >= max){
            max = authors[Name]
            n = Name
        }
    }

    return {author:n,likes:max}

}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}