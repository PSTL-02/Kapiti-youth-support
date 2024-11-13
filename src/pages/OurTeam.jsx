import {useState, useEffect} from 'react'
import axios from 'axios'
import PageHeader from '../components/PageHeader'
import Seo from '../components/Seo';
const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const OurTeam = () => {
  const [loading, setLoading] = useState(true)
  const [people, setPeople] = useState([])
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [terms, setTerms] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState('');

  const endpoint = `${baseUrl}/people?_embed`

  useEffect(() =>{
    axios.get(endpoint)
    .then((res) =>{
      const fetchedPeople = res.data;
      setPeople(fetchedPeople)
      setFilteredPeople(fetchedPeople)

      const uniqueTerms = new Set();
      fetchedPeople.forEach(person => {
        person._embedded['wp:term'][0].forEach(term => uniqueTerms.add(term.name));
      });
      setTerms([...uniqueTerms]);
      setLoading(false);
    })
    .catch((err) => console.log(err));
  },[])

  const handleTermChange = (person) =>{
    const term = person.target.value
    setSelectedTerm(term);
    if (term) {
      const filtered = people.filter(person =>
        person._embedded['wp:term'][0].some(t => t.name === term)
      );
    setFilteredPeople(filtered)
    } else {
      setFilteredPeople(people)
    }
  };

  const PersonList = ({people}) => {
    const mappedPeople = people.map((person, index) =>{
      function getFeaturedImage(person){
        if (person && 
          person._embedded && 
          person._embedded['wp:featuredmedia'] && 
          person._embedded['wp:featuredmedia'][0].source_url){
          return person._embedded['wp:featuredmedia'][0].source_url;
        }else {
          return 'https://via.placeholder.com/150';
        }
      }

      const termNames = person._embedded['wp:term'][0].map(term => `<span class='categories'>${term.name}</span>`).join(' ');

      return (
        <div key={person.slug + "-" + index} className="post-container">
          <img src={getFeaturedImage(person)} alt={person.title.rendered + ' profile picture'} className='post-img'/>
          <br />
          <h4 className="title">{person.title.rendered}</h4>
          <br />
          <div className='terms' dangerouslySetInnerHTML={{__html: termNames}}/>
          <div dangerouslySetInnerHTML={{ __html: person.content.rendered }} />
        </div>
      );
    });

    return <>{mappedPeople}</>;
    
  };
    
  return (
    <>
      <Seo
        title="Our Team - Kāpiti Youth Support"
        description="Meet the passionate team at Kāpiti Youth Support "
        url={window.location.href}
      />

       <PageHeader title="Our Team" image_url="/header_imgs/bg1.png"/>
      <div className='container' >
      <div className='filter-container'>
          <select value={selectedTerm} onChange={handleTermChange}>
            <option value=''>All Roles</option>
            {terms.map((term, index) => (
              <option key={index} value={term}>{term}</option>
            ))}
          </select>
        </div>
      <div id="homeCont">
        {loading ? <p>Loading...</p> : <PersonList people={filteredPeople} />}
      </div>
    </div>
    </>
  )
}

export default OurTeam
