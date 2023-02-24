
//import axios from 'axios';
import React from 'react'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import Post from '../Components/Post'
import {sortByDate} from '../utils'

 function Home({posts}) {

  return (
    <div className='container'>
  
  <div className='posts'>
        {posts.map((post,index ) => (
<Post Key={index} post={post}/>
        ))}
      </div>
    </div>
  )
}
export default Home;

export async function getStaticProps() {
  // Get files from the posts dir
  const files = fs.readdirSync(path.join('posts'))

  // Get slug and frontmatter from posts
  const posts = files.map((filename) => {
    // Create slug
    const slug = filename.replace('.md', '')

    // Get frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    )

    const { data: frontmatter } = matter(markdownWithMeta)

    return {
      slug,
      frontmatter,
    }
  })

  return {
    props: {
      posts:posts.sort(sortByDate),
    },
  }
}
