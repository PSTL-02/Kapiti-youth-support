import {useState, useEffect} from 'react'
import axios from 'axios'
import PageHeader from '../components/PageHeader'
import Seo from '../components/Seo';
const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const WhatWeDo = () => {
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState(null)

    const endpoint = `${baseUrl}/posts?_embed`

    useEffect(() => {
        axios.get(`${endpoint}`)
        .then((res) => {
          console.log(res)
          setPosts(res.data)
          setLoading(false)
        })
        .catch((err) => console.log(err))
    }, [])

    // Featured image check
    function getFeaturedImage(post) {
        if (post && post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0].source_url) {
        return post._embedded['wp:featuredmedia'][0].source_url;
        } else {
        return 'https://via.placeholder.com/150';
        }
    }
  

    const Posts = ({ posts }) => {
        console.log({ posts });
        const mappedPosts = posts.map((post, index) => {
          return (
            <div className="posts-grid">
              <div key={post.slug + "-" + index} className="post-container">
                <h4 className="title">{post.title.rendered}</h4>
                <br />
                {/* <img src={getFeaturedImage(post)} alt={post.title.rendered + ' profile picture'}/> */}
                <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                <a href={`#/whatwedo/${post.id}`} className="read-more-link">Read More...</a>
              </div>
            </div>
          );
        }); // end of map
        
        console.log({ mappedPosts });
        
        return (
          <>{mappedPosts}</>
        )
    }

  return (
    <>

      <Seo
        title="What We Do - Kāpiti Youth Support"
        description="Come see what we do at Kāpiti Youth Support "
        url={window.location.href}
      />

    <PageHeader title="What we do" image_url="/header_imgs/bg3.jpg"/>
    <div className='container' >
      <div id="homeCont">
        {loading ? <p>Loading...</p> : <Posts posts={posts} />}
      </div>
    </div>
      
    </>
  )
}

export default WhatWeDo
