import { useState } from 'react'
import './App.css'

function App() {

  const [permission, setPermission] = useState(Notification.permission)
  const [product, setProduct] = useState(null)

  const requestNotificationPermission = async () => {

    if (!('Notification' in window)) {
      alert("Browser does not support notifications")
      return
    }

    const status = await Notification.requestPermission()
    setPermission(status)
  }

  const fetchSampleProduct = async () => {
    const res = await fetch('https://fakestoreapi.com/products/1')
    const data = await res.json()
    setProduct(data)
  }

  return (
    <div style={{padding:'20px'}}>

      <h1>PWA Deal Alerts</h1>

      <p><b>Permission Status:</b> {permission}</p>

      {permission !== "granted" && (
        <button onClick={requestNotificationPermission}>
          Enable Background Alerts
        </button>
      )}

      <br /><br />

      <button onClick={fetchSampleProduct}>
        Fetch Product
      </button>

      {product && (
        <div>
          <h3>{product.title}</h3>
          <p>${product.price}</p>
        </div>
      )}

    </div>
  )
}

export default App