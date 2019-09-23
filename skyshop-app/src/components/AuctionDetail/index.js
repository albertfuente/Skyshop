import React, { useContext, useEffect, useState } from 'react'
import Context from '../Context'
import logic from '../../logic'
import Countdown from 'react-countdown-now';
import './index.sass'
import moment from 'moment'
import { Redirect, withRouter } from "react-router-dom"



function AuctionDetail({ history }) {

  const Completionist = () => <span>Auction finished !!!</span>;
  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {
      return <span>Remaining hours: {hours}:{minutes}:{seconds}</span>
    }
  }

  const [counter, setCounter] = useState(1)
  const [success, setSuccess] = useState(false)
  const [priceAuction, setPriceAuction] = useState()
  const [owner, setOwner] = useState()
  const [finalTime, setFinalTime] = useState()
  const [defined, setDefined] = useState(false)

  let price
  let auctionId  

  const { setView, view, product, setProduct, productQuery, user } = useContext(Context)
  const productId = productQuery

  useEffect(() => {
    (async () => {
      try {
        const product = await logic.retrieveProduct(productQuery)

        setProduct(product)
        setCounter(product.price)

        const auction = await logic.retrieveAuctionProduct(productId)

        if (auction.auction === false) {
          setDefined(false)
          const result = await logic.setAuction(productId)
          setSuccess(true)

        } else {
          setDefined(true)
          auctionId = auction.auction._id
          const res = await logic.setDate(auctionId)
          const response = await logic.retrieveAuction(auctionId)
          console.log('auction retrieved')

          setPriceAuction(response.auction.price)
          setCounter(response.auction.price)
          setOwner(response.auction.owner.name)

          const initialTime = response.auction.date

          const finalTime = moment(initialTime).add(1, 'days').valueOf()

          setFinalTime(finalTime)
        }

      } catch (error) {
        console.log(error.message)
      }
    })()
  }, [defined])

  function handleGoBack(event) {
    event.preventDefault()
    setView("landing")
  }

  function handleSubmitAuction(event) {
    event.preventDefault()
    setDefined(true)
    handleAuction(productId)
  }

  async function handleAuction(productId) {
    if (counter > priceAuction) {
      try {

        const isDefined = await logic.retrieveAuctionProduct(productId)
        if (isDefined.auction === false) {
          const result = await logic.setAuction(productId)
          setSuccess(true)
          setDefined(true)
          //history.push("/auctions/detail") // TODO goto /auctions/:productId
        }
        else {
          auctionId = isDefined.auction._id

          await logic.setDate(auctionId)
          price = parseInt(counter)
          await logic.updateAuction(auctionId, price)
          const response = await logic.retrieveAuction(auctionId)
          console.log('auction retrieved')
          setPriceAuction(response.auction.price)
          setCounter(response.auction.price)
          setOwner(response.auction.owner.name)
        }


      } catch (error) {
        console.log(error.message)
      }
    }
  }


  return <>

    {product && user && <div>
      <ul className='detail'>
        <li className="detail-title">{product.title}</li>
        <li className="detail-picture"><img src={product.image} /></li>
        <li className="detail-price">{'Initial price: ' + product.price + " €"}</li>
        <li className="detail-description">{product.description}</li>
      </ul>
      <div className="detail-add-cart-container">

        {defined && priceAuction && <div className="detail-counter">
          <button className="detail-operator" onClick={event => {
            event.preventDefault()
            setCounter(counter - 1)

            if (counter == priceAuction) setCounter(priceAuction)

          }}>-</button>
          <p className="detail-result">{counter + " €"}</p>
          <button className="detail-operator" onClick={event => {

            setCounter(counter + 1)

          }}>+</button>

        </div>}

        {defined && <button className="formPanel-reject2"><a onClick={handleSubmitAuction}>Push Auction !</a></button>}
        {!defined && <button className="formPanel-reject2"><a onClick={handleSubmitAuction}>Start Auction !</a></button>}

        <br></br>
        { (() => console.log(finalTime))()}
        {defined && finalTime && <Countdown date={finalTime} renderer={renderer} />}
        {priceAuction && <p className="detail-owner">{'Last push: ' + owner}</p>}

      </div>
      <a onClick={handleGoBack}><i className="far fa-2x fa-arrow-alt-circle-left backFromDetail"></i></a>
      {view === "landing" && <Redirect to="/auctions" />}

    </div>

    }





  </>
}

export default withRouter(AuctionDetail)