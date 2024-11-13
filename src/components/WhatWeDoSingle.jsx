import {useState, useEffect}  from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import PageHeader from '../components/PageHeader'
const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

// Seo component
import Seo from './Seo';
{/* <>
    title={post.yoast_head_json?.title || post.title.rendered}
    description={post.yoast_head_json?.description}
    image={post.yoast_head_json?.og_image?.[0]?.url}
    url={post.yoast_head_json?.og_url || window.location.href}
</> */}

const WhatWeDoSingle = () => {
    const[post, setPost] = useState(null)
    const[loading, setLoading] = useState(true)
    const [seoData, setSeoData] = useState(null); // Yoast SEO state
    const {id} = useParams();

    useEffect(() => {
        axios.get(`${baseUrl}/posts/${id}?_embed`)
          .then((response) => {
            setPost(response.data);
            setSeoData(response.data.yoast_head_json); // Set Yoast SEO data
            setLoading(false);
          })
          .catch((error) => console.error(error));
      }, [id]);
    
    // // Featured image check
    // function getFeaturedImage(post) {
    //     if (post && post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0].source_url) {
    //       return post._embedded['wp:featuredmedia'][0].source_url;
    //     } else {
    //       return 'https://via.placeholder.com/150';
    //     }
    // }

    if (loading) {
        return <>Loading...</>
    }
    
    return (
    <>
    <Seo
        title={post.yoast_head_json?.title || `${post.title.rendered} - My First Wp` }
        description={post.yoast_head_json?.description}
        image={post.yoast_head_json?.og_image?.[0]?.url}
        url={window.location.href}
      />
      <PageHeader title="More Info" image_url="/header_imgs/bg3.jpg"/>
    <div className='single-container'>
        <div key={post.slug} className="single-post-container">
            <h4 className="title">{post.title.rendered}</h4>
            {/* <img src={getFeaturedImage(post)} alt="" /> */}
            <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
            <div>Key: {post.slug}</div>
        </div>
    </div>
    </>
    )
  }

export default WhatWeDoSingle