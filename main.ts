import fs from 'fs'
import path from 'path'
import util from 'util'
import * as readline from 'readline'
import axios from 'axios'

const logFile = fs.createWriteStream(path.resolve(__dirname, 'ndp.log'))
const readInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
let next = true
let successCounter = 0
let finishCounter = 0
let failCounter = 0
let skipCounter = 0

console.log()
console.log('Naver X Dispatch HD Photos Downloader')
console.log()
readInterface.question('Please enter CID: ', main)

function main(data: any) {
  const CID: string = data.toString().trim()
  console.log(`Now downloading HD Photos with CID ${CID}`)
  console.log()
  if (!fs.existsSync(path.resolve(__dirname, 'downloads'))) {
    fs.mkdirSync(path.resolve(__dirname, 'downloads'))
  }
  if (!fs.existsSync(path.resolve(__dirname, 'downloads', CID))) {
    fs.mkdirSync(path.resolve(__dirname, 'downloads', CID))
  }
  getImageInfo(CID).then(() => {
    console.log('Initiated ' + (successCounter + failCounter + skipCounter) + ' downloads.')
    console.log(successCounter + ' file(s) successfully downloaded.')
    console.log(failCounter + ' downloads failed.')
    console.log(skipCounter + ' downloads skipped.')
    console.log()
    logFile.close()
    if (successCounter === 0) process.exit()
  })
}

async function getImageInfo(CID: string, page: number = 1) {
  const URL = `https://entertain.naver.com/topic/morePhoto.json?cid=${CID}&page=${page}`
  try {
    console.log('Getting image information: PAGE ' + page)
    const response = await axios.get(URL)
    if (!response.data) {
      console.error('Server sent no data!')
    } else if (response.data.results === '') {
      console.log('No more image information available. Ends of download.')
      next = false
    } else if (Array.isArray(response.data.results)) {
      const dataArray = response.data.results[0].thumbnails
      console.log('Got ' + dataArray.length + ' images information. Downloading HD images...')
      for (const data of dataArray) {
        const thumbUrl = data.thumbUrl
        const url = thumbUrl.substr(0, thumbUrl.length - 15)
        const destFile = url.substr(url.length - 9, url.length)
        console.log('Initialising download: ' + data.title)
        await download(path.resolve(__dirname, 'downloads', CID, destFile), url)
      }
    }
  } catch (err) {
    logFile.write('ERROR (getImageInfo):\n' + util.format(err) + '\n')
    console.log('Failed to get image information: PAGE ' + page)
    console.log('See "ndp.log" file for more information.')
  }
  console.log()
  if (next) await getImageInfo(CID, page + 1)
}

async function download(destPath: string, url: string) {
  if (fs.existsSync(destPath)) {
    skipCounter++
    console.log('Skipping ' + destPath + '. File exists.')
    return
  }
  const file = fs.createWriteStream(destPath)
  try {
    const response = await axios.get(url, { responseType: 'stream' })
    const data = response.data
    data.on('finish', () => {
      file.close()
      finishCounter++
      if (finishCounter === successCounter) process.exit()
    })
    data.on('error', error => {
      fs.unlinkSync(destPath)
    })
    await data.pipe(file)
    logFile.write('Downloaded: ' + url + ' to ' + destPath + '\n')
    console.log('Downloaded: ' + destPath)
    successCounter++
  } catch (err) {
    failCounter++
    logFile.write('ERROR (download):\n' + util.format(err) + '\n')
    console.log('Failed to get image: ' + destPath)
    console.log('See "ndp.log" file for more information.')
  }
}
