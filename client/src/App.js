import React, { useState, useRef } from 'react'
import './App.css'

function App() {
  const resultsRef = useRef()
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState()
  const [compressText, setCompressText] = useState('')
  const [deCompressText, setDeCompressText] = useState('')
  const [resultsArray, setresultsArray] = useState([])
  const [error, setError] = useState()

  const onClickCompress = async () => {
    setLoading(true)
    setError('')
      const data = compressText || file
      const xhr = new XMLHttpRequest()
      xhr.open("POST", `http://${window.location.host}/compress`)
      if (compressText.length > 0) {
        xhr.setRequestHeader('Content-Type', 'text/plain')
      }
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === XMLHttpRequest.DONE) {
          if (this.status === 200) {
            const response = JSON.parse(this.response)
            setresultsArray(response)
            setLoading(false)
          } else {
            setError(`${this.status}: ${this.responseText}`)
            setLoading(false)
          }
        }
      })
      xhr.send(data)
  }

  const onClickDeCompress = async () => {
    setLoading(true)
    setError('')
    const data = deCompressText || file
    const xhr = new XMLHttpRequest()
    xhr.open("POST", `http://${window.location.host}/decompress`)
    if (deCompressText.length > 0) {
      xhr.setRequestHeader('Content-Type', 'text/plain')
    }
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === XMLHttpRequest.DONE) {
        if (this.status === 200) {
          const response = JSON.parse(this.response)
          setresultsArray(response)
          setLoading(false)
        } else {
          setError(`${this.status}: ${this.responseText}`)
          setLoading(false)
        }
      }
    })
    xhr.send(data)
}

  const copyResults = () => {
    resultsRef.current.select()
    document.execCommand('copy')
  }

  return (
    <div className="compress">
      <div className="compress__header">
        <h1>Lossless String Compression</h1>
        <p className="compress__descr">Upload a text file or use the text area.<br /><em>Words must be seperated by new lines!</em></p>
      </div>
      <div className="compress_file">
        <h2>Compress Words</h2>
        <input type="file" className="file__input" onChange={e => setFile(e.target.files[0])} />
        <textarea rows="5" cols="50" value={compressText} onChange={e => setCompressText(e.target.value)} />
        <button onClick={onClickCompress}>Compress</button>
      </div>
      <div className="decompress_file">
        <h2>Decompress Words</h2>
        <input type="file" className="file__input" onChange={e => setFile(e.target.files[0])} />
        <textarea rows="5" cols="50" value={deCompressText} onChange={e => setDeCompressText(e.target.value)} />
        <button onClick={onClickDeCompress}>Decompress</button>
      </div>
      <div className="compress__results">
        <h2>Results</h2>
        {loading
          ? <div className="results__loading">Loading...</div>
          : <>
              <div className="results__copy" onClick={copyResults}>
                Copy to clipboard
              </div>
              <textarea readOnly className="results__array" rows="10" cols="100" ref={resultsRef}>
                {resultsArray.join('\r\n')}
              </textarea>
            </>
        }
        <div className="errors">{error}</div>
      </div>
    </div>
  )
}

export default App
