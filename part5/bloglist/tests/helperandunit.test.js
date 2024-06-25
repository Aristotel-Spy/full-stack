const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const supertest = require('supertest')
const app = require('../app')

const User = require('../models/user')

const bcrypt = require('bcrypt')

const Blog = require('../models/blog')

const api = supertest(app)

test('dummy returns 1',()=>{

    const blogs = []

    const result = listHelper.dummy(blogs)

    assert.strictEqual(result,1)
})

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ]

    const blogs = [
        {
          _id: "5a422a851b54a676234d17f7",
          title: "React patterns",
          author: "Michael Chan",
          url: "https://reactpatterns.com/",
          likes: 7,
          __v: 0
        },
        {
          _id: "5a422aa71b54a676234d17f8",
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
          likes: 5,
          __v: 0
        },
        {
          _id: "5a422b3a1b54a676234d17f9",
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          likes: 12,
          __v: 0
        },
        {
          _id: "5a422b891b54a676234d17fa",
          title: "First class tests",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
          likes: 10,
          __v: 0
        },
        {
          _id: "5a422ba71b54a676234d17fb",
          title: "TDD harms architecture",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
          likes: 0,
          __v: 0
        },
        {
          _id: "5a422bc61b54a676234d17fc",
          title: "Type wars",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
          likes: 2,
          __v: 0
        }  
      ]
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      assert.strictEqual(result, 5)
    })
    test('when list has no blogs',()=>{
        const listWithNoBlogs = []

        const result = listHelper.totalLikes(listWithNoBlogs)
        assert.strictEqual(result,0)
    })
    test('when list has multiple blogs',()=>{

        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result,36)

    })
  })


  describe('Favourite blog', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ]

    const blogs = [
        {
          _id: "5a422a851b54a676234d17f7",
          title: "React patterns",
          author: "Michael Chan",
          url: "https://reactpatterns.com/",
          likes: 7,
          __v: 0
        },
        {
          _id: "5a422aa71b54a676234d17f8",
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
          likes: 5,
          __v: 0
        },
        {
          _id: "5a422b3a1b54a676234d17f9",
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          likes: 12,
          __v: 0
        },
        {
          _id: "5a422b891b54a676234d17fa",
          title: "First class tests",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
          likes: 10,
          __v: 0
        },
        {
          _id: "5a422ba71b54a676234d17fb",
          title: "TDD harms architecture",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
          likes: 0,
          __v: 0
        },
        {
          _id: "5a422bc61b54a676234d17fc",
          title: "Type wars",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
          likes: 2,
          __v: 0
        }  
      ]
  
    test('when list has only one blog, that is favourite.', () => {
      const result = listHelper.favoriteBlog(listWithOneBlog)
      assert.deepStrictEqual(result,{title:listWithOneBlog[0].title,author:
        listWithOneBlog[0].author,likes:listWithOneBlog[0].likes
      }) //.deepStricEqual for objects.
    })
    test('when list has no blogs',()=>{
        const listWithNoBlogs = []

        const result = listHelper.favoriteBlog(listWithNoBlogs)
        assert.deepStrictEqual(result,null)
    })
    test('when list has multiple blogs',()=>{

        const result = listHelper.favoriteBlog(blogs)
        assert.deepStrictEqual(result,{title: "Canonical string reduction",
            likes:12,
            author: "Edsger W. Dijkstra"
        })

    })
  })


  describe('Most blogs', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ]

    const blogs = [
        {
          _id: "5a422a851b54a676234d17f7",
          title: "React patterns",
          author: "Michael Chan",
          url: "https://reactpatterns.com/",
          likes: 7,
          __v: 0
        },
        {
          _id: "5a422aa71b54a676234d17f8",
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
          likes: 5,
          __v: 0
        },
        {
          _id: "5a422b3a1b54a676234d17f9",
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          likes: 12,
          __v: 0
        },
        {
          _id: "5a422b891b54a676234d17fa",
          title: "First class tests",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
          likes: 10,
          __v: 0
        },
        {
          _id: "5a422ba71b54a676234d17fb",
          title: "TDD harms architecture",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
          likes: 0,
          __v: 0
        },
        {
          _id: "5a422bc61b54a676234d17fc",
          title: "Type wars",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
          likes: 2,
          __v: 0
        }  
      ]
  
    test('when list has only one blog, name of author and 1 blog', () => {
      const result = listHelper.mostBlogs(listWithOneBlog)
      assert.deepStrictEqual(result,{author: 'Edsger W. Dijkstra',blogs:1}) //.deepStricEqual for objects.
    })
    test('when list has no blogs',()=>{
        const listWithNoBlogs = []

        const result = listHelper.mostBlogs(listWithNoBlogs)
        assert.deepStrictEqual(result,null)
    })
    test('when list has multiple blogs',()=>{

        const result = listHelper.mostBlogs(blogs)
        assert.deepStrictEqual(result,{author:"Robert C. Martin",blogs:3})

    })
  })


  describe('Most liked Author', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ]

    const blogs = [
        {
          _id: "5a422a851b54a676234d17f7",
          title: "React patterns",
          author: "Michael Chan",
          url: "https://reactpatterns.com/",
          likes: 7,
          __v: 0
        },
        {
          _id: "5a422aa71b54a676234d17f8",
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
          likes: 5,
          __v: 0
        },
        {
          _id: "5a422b3a1b54a676234d17f9",
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          likes: 12,
          __v: 0
        },
        {
          _id: "5a422b891b54a676234d17fa",
          title: "First class tests",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
          likes: 10,
          __v: 0
        },
        {
          _id: "5a422ba71b54a676234d17fb",
          title: "TDD harms architecture",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
          likes: 0,
          __v: 0
        },
        {
          _id: "5a422bc61b54a676234d17fc",
          title: "Type wars",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
          likes: 2,
          __v: 0
        }  
      ]
  
    test('when list has only one blog, name of author and likes.', () => {
      const result = listHelper.mostLikes(listWithOneBlog)
      assert.deepStrictEqual(result,{author: 'Edsger W. Dijkstra',likes:5}) //.deepStricEqual for objects.
    })
    test('when list has no blogs',()=>{
        const listWithNoBlogs = []

        const result = listHelper.mostLikes(listWithNoBlogs)
        assert.deepStrictEqual(result,null)
    })
    test('when list has multiple blogs',()=>{

        const result = listHelper.mostLikes(blogs)
        assert.deepStrictEqual(result,{author:"Edsger W. Dijkstra",likes:17})

    })
  })

  initialBlogs = [ {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
  }  ]

  beforeEach(async ()=>{

    await Blog.deleteMany({})

    let newBlog = new Blog(initialBlogs[0])

    await newBlog.save()

    newBlog = new Blog(initialBlogs[1])

    await newBlog.save()
  })

  test.only('Correct amount of blogs',async ()=>{

    const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length,initialBlogs.length)

  })

  test.only('Correctly named id', async ()=>{

    const response = await api.get('/api/blogs')

    const firstObject = response.body[0] //get the first blog

    assert.strictEqual('id' in firstObject,true)
    //and that _id is not in firstObject just to be extra sure.
    assert.strictEqual('_id' in firstObject,false)
    //this works due to json transformation.

    //if 'id' is in object then it has the id correctly, we chose first blog object but it doesn't matter
    //they will either all have the id as _id or as id anyway.
  })

  test.only('A valid blog can be added', async()=>{

    const testBlog = {
      title: "Some random title",
      author: "Some Rand. Guy",
      url: "some random url",
      likes: 0
    }

    await api.post('/api/blogs').send(testBlog).expect(201).expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(blog => blog.title)
    const authors = response.body.map(blog => blog.author)
    const urls = response.body.map(blog => blog.url)

    assert.strictEqual(response.body.length,initialBlogs.length + 1)

    assert.strictEqual(titles.includes(testBlog.title),true)
    assert.strictEqual(authors.includes(testBlog.author),true)
    assert.strictEqual(urls.includes(testBlog.url),true)

  })

  test.only('if likes arent given',async()=>{

    const testBlog = {
      title: "Some random title",
      author: "Some Rand. Guy",
      url: "some random url"
    }

    await api.post('/api/blogs').send(testBlog).expect(201).expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    //assert that the likes are default 0
    //we know that we always put 2 blogs before every test with beforeEach, so adding this it means this is the third.
    assert.strictEqual(response.body[2].likes,0)
    //and assert that it has actually been added, although we have tested it above.

    assert.strictEqual(response.body.length,initialBlogs.length+1)

  })

  test.only('validation error',async()=>{

    const testBlog1 = {
      author: "Some Rand. Guy",
      url: "some random url"
    }

    const testBlog2 = {
      title: "Some random title",
      author: "Some Rand. Guy",
    }

    await api.post('/api/blogs').send(testBlog1).expect(400)

    await api.post('/api/blogs').send(testBlog2).expect(400)

    //just to be sure they didn't get added to the db, obviously too paranoid:

    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length,initialBlogs.length)

  })

  test.only("Deleting a resource" , async()=>{

    const response = await api.get('/api/blogs')

    //grab the first id and delete.

    const firstId = response.body[0].id

    await api.delete(`/api/blogs/${firstId}`).expect(204)

    const newResponse = await api.get('/api/blogs')

    assert.strictEqual(newResponse.body.length,initialBlogs.length - 1)
  })

  test.only('Updating likes',async()=>{

    const response = await api.get('/api/blogs')

    const firstId = response.body[0].id

    const updatedBlog = {...response.body[0],likes:10}

    await api.put(`/api/blogs/${firstId}`).send(updatedBlog).expect(200)

    const newResponse = await api.get('/api/blogs')

    const updatedLikesBlog = newResponse.body[0]

    assert.strictEqual(updatedLikesBlog.likes,10)

    assert.strictEqual(newResponse.body.length,initialBlogs.length)
  })

  describe('Proper user adding',()=>{

    beforeEach(async()=>{

      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })

    test('username validation error',async()=>{

      user0 = {
        "username":"Ra",
        "name":"SomeOne",
        "password":"sekret"
      }

      user1 = {
        "name":"SomeOne",
        "password":"sekret"
      }

      await api.post('/api/users').send(user0).expect(400)

      await api.post('/api/users').send(user1).expect(400)

      const response = await api.get('/api/users')

      assert.strictEqual(response.body.length,1) //equal to 1 only the one user that is added at beforeEach.

    })

    test('name uniqueness',async()=>{

      user0 = {
        "username":"root",//same name as the first one.
        "name":"SomeOne",
        "password":"sekret"
      }

      const response = await api.post('/api/users').send(user0).expect(400)

      assert.strictEqual(response.body.error.includes("username must be unique!"),true)

      const secondResponse = await api.get('/api/users')

      assert.strictEqual(secondResponse.body.length,1) //not added

      
    })

    test('password validation',async()=>{

      user0 = {
        "username":"ruby",
        "name":"SomeOne",
        "password":"se"
      }

      user1 = {
        "username":"python",
        "name":"SomeOne"
      }



      const response = await api.post('/api/users').send(user0).expect(400)

      assert.strictEqual(response.body.error.includes("password must be at least 3 chars long!"),true)
      
      const secondResponse = await api.post('/api/users').send(user1).expect(400)

      assert.strictEqual(secondResponse.body.error.includes("password must be given!"),true)

      const thirdResponse = await api.get('/api/users')

      assert.strictEqual(thirdResponse.body.length,1) //not added

    })
  })