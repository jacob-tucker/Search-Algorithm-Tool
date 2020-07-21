import React, {useState} from 'react'

import './Navbar.css'

const Navbar = () => {
  const [show, setShow] = useState(false)

  return (
    <div className="Navbar">
      <h1 className="title">Search Algorithm Tool :)</h1>
      <h2 className="help" onClick={() => setShow(!show)}>?</h2>


      {show ? <div className="helpCenter"><h1>Key Definitions</h1><h3><i style={{color: 'black'}}>Weighted </i>- this means that the end point is used in the algorithm.
      The algorithm constantly keeps track of distances to the end point and will use that to determine the order in which it
      searches nodes. In other words, it has a <i>bias</i> towards the end point.</h3>
      <h3><i><b style={{color: 'black'}}>Unweighted </b></i>- this means that the algorithm is <i>not</i> weighted, and thus does not have a bias towards
      the end point. It will search every node equally until it finds the end point.</h3>
      <h1>Functionality</h1><h3>After choosing an algorithm, click <span style={{color: 'black'}}>Perform</span> to start.</h3><h3>Hit <span style={{color: 'black'}}>Restart</span> to completely reset the board.</h3>
      <h3>Select <span style={{color: 'black'}}>Mazes</span> to see a list of mazes that implement a set of walls for you.</h3></div> : null}


      <div className="example1"><span className='node-example node-wall-example'></span><p><i>Wall node</i> - click on an empty space to create a wall. Click & drag to create multiple.</p></div>
      <div className="example2"><span className='node-example node-start-example'></span><p><i>Start node</i> - move around to change the starting position.</p></div>
      <div className="example3"><span className='node-example node-finish-example'></span><p><i>Finish node</i> - move around to change finish destination.</p></div>
      <div className="example4"><span className='node-example node-visited-example'></span><p><i>Visited node</i> - indicates that this node has been visited by the algorithm.</p></div>
      <div className="example5"><span className='node-example node-shortest-path-example'></span><p><i>Shortest path node</i> - indicates the "shortest" path.</p></div>
    </div>
  )
}

export default Navbar
