import React, {useCallback, useEffect} from 'react';
import {useSetState} from 'react-use'
import './App.css'

const App = () => {
  const [state, setState] = useSetState({
    list: [],
    loading: false,

    previewUrl: '',
    previewVisible: false
  })

  const getData = async () => {
    setState({loading: true})

    const res = await new Promise(resolve => {
      setTimeout(() => {
        resolve([
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuPphLU_rw211Ix3Sd49p8VeJDvm63hrDLFg&usqp=CAU',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuPphLU_rw211Ix3Sd49p8VeJDvm63hrDLFg&usqp=CAU',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuPphLU_rw211Ix3Sd49p8VeJDvm63hrDLFg&usqp=CAU'
        ])
      }, 1000)
    })

    setState(prevState => ({
      list: prevState.list.concat(res),
      loading: false
    }))
  }


  const loadMore = () => {
    const isBottom = document.documentElement.scrollTop + window.innerHeight  ===  document.documentElement.offsetHeight
    if(isBottom){
      getData().then()
    }
  }

  const onPreview = useCallback((imgUrl) => {
    setState({
      previewUrl: imgUrl,
      previewVisible: true
    })
  }, [setState])

  useEffect(() => {
    getData().then()
    window.addEventListener('scroll', loadMore)
    return () => {
      window.removeEventListener('scroll', loadMore)
    }
  }, [])

  return (
      <div>
        <div
            className="preview" style={{display: state.previewVisible ? 'flex' : 'none'}}
            onClick={() => setState({previewVisible: false})}
        >
          <img src={state.previewUrl} alt=""/>
        </div>

        <div style={{padding: 20}}>
          {state.list.map((item, index) => (
              <Item key={index} onClick={() => onPreview(item)}/>
          ))}
        </div>
      </div>
  );
};

const Item = ({onClick}) => {
  return (
      <div className="box-wrapper" onClick={onClick}>
        <div className="item">
          1
        </div>

        <div className="box-child-wrapper">
          <div className="item">1</div>
          <div className="item">1</div>
          <div className="item">1</div>
        </div>
      </div>
  )
}

export default App;
