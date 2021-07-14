import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Date from '../components/date'
import Link from 'next/link'
import React from 'react'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
const MyButton = React.forwardRef(({ onClick, href, title }, ref) => {
  return (
    <button onClick={onClick} ref={ref}>
      {title}
    </button>
  )
})
export default function Home({ allPostsData }) {
  const onClick=(id)=>{
    document.location.href=`posts/${id}`;
  }
  return (
    <Layout home>
      {/* Keep the existing code here */}

      {/* Add this <section> tag below the existing <section> tag */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`posts/${id}`} passHref>
                <MyButton title={title} onClick={()=>onClick(id)}/>
                </Link>
              <br />
              {id}
              <br />
      <Date dateString={date} />
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}