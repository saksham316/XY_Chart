import React from 'react'
import { BallTriangle, Circles } from 'react-loader-spinner'

const PageLoader = () => {
    return (
        <div>
            <Circles
                height={100}
                width={100}
                radius={5}
                color="#4fa94d"
                ariaLabel="ball-triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}

export default PageLoader
