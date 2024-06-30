import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import Blog from './Blog'; 
import Blogform from './Blogform';

test('renders content title and author, but not url or likes by default', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'someguy',
    url: 'someurl',
    likes: 5,
    user: {
      username:'whatever',
      name:'sup'
    }
  }

  const user = {
    username:'idc',
    name:'sure'
  }

  render(<Blog blog={blog} User={user} />)

   
  const titleAuthorText = `${blog.title} - ${blog.author}`
  const titleAuthorElement = screen.getByText(titleAuthorText)
  expect(titleAuthorElement).toBeDefined()


  expect(screen.queryByText('URL:')).not.toBeVisible()
  expect(screen.queryByText('Likes:')).not.toBeVisible()


});

test('shows URL and likes when the details button is clicked', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'someguy',
    url: 'someurl',
    likes: 5,
    user: {
      username:'whatever',
      name:'sup'
    }
  };

  const user = {
    username: 'idc',
    name: 'sure'
  };

  render(<Blog blog={blog} User={user} />)

  // Initially checks that URL and likes are not visible
  expect(screen.queryByText('URL:')).not.toBeVisible()
  expect(screen.queryByText('Likes:')).not.toBeVisible()

  // Find and click the 'show' button
  const button = screen.getByRole('button', { name: 'show' });
  await userEvent.click(button)

  // Check if the URL and likes are now visible
  expect(screen.getByText('URL:')).toBeVisible()
  expect(screen.getByText('Likes:')).toBeVisible()
});


test('like button is clicked twice, handleLike is called twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'someguy',
    url: 'someurl',
    likes: 5,
    user: {
      username:'whatever',
      name:'sup'
    }
  };

  const user = {
    username: 'idc',
    name: 'sure'
  };

  const handleLike = vi.fn()  // Mock function

  render(<Blog blog={blog} handleLike={handleLike} User={user} />)

  // Make the likes and like button visible by clicking the 'show' button
  const showButton = screen.getByRole('button', { name: 'show' })
  await userEvent.click(showButton);

  // Find and click the 'like' button twice
  const likeButton = screen.getByRole('button', { name: 'like' })
  await userEvent.click(likeButton)
  await userEvent.click(likeButton)

  // Assert that handleLike was called exactly twice
  expect(handleLike.mock.calls).toHaveLength(2)
  // Optionally, check if it was called with the correct blog object
  expect(handleLike).toHaveBeenCalledWith(blog)
});


test('Blogform calls event handler with right details when a new blog is created', async () => {
  const submitBlog = vi.fn() // Mock function
  render(<Blogform submitBlog={submitBlog} />)

  // Simulate user input
  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')
  
  await userEvent.type(titleInput, 'New Blog Title')
  await userEvent.type(authorInput, 'Author Name')
  await userEvent.type(urlInput, 'http://newblog.com')

  // Submit the form
  const submitButton = screen.getByRole('button', { name: 'submit' });
  await userEvent.click(submitButton)

  // Assert that submitBlog was called once with the correct parameters
  expect(submitBlog).toHaveBeenCalledWith({
    title: 'New Blog Title',
    author: 'Author Name',
    url: 'http://newblog.com'
  })
})
