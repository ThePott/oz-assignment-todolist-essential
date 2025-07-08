import React from 'react'

const QuoteTemplate = ({children}) => {
  return (
    <div className='quote-template'>{children}</div>
  )
}


const Quote = ({quoteJson, quoteStatus}) => {
  if (!quoteJson || quoteStatus === "IS_LOADING") { return <QuoteTemplate /> }
  
  if (quoteStatus === "ERROR") { return <QuoteTemplate>Life is good.</QuoteTemplate> }

  return (
    <QuoteTemplate>
      <h2>{quoteJson.quote}</h2>
      <p>{quoteJson.author}</p>
    </QuoteTemplate>
  )
}

export default Quote