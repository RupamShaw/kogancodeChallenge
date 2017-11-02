
import store from '../store'
import React, { Component } from 'react';
import axios from "axios";
import Rest from '../components/Rest'

const cubicObject = []
let endpoint = '/api/products/1'

function getData(data) {
    let hasNext = true
    calculateCubicWeight(data.objects)
    endpoint = data.next
    console.log('****next endpoint', endpoint, 'hasNext ', hasNext);

    if (data.next === 'null') {
        hasNext = false
    }

    return hasNext
}

function calculateAverage() {
    let sum = 0
    cubicObject.map(object => sum = sum + object.cubicWeight)
    let avg = 0
    avg = (sum / cubicObject.length).toFixed(2)
    console.log( 'cubicObject.length', cubicObject.length, '**********avg************', avg)
    if (avg === 'NaN') avg = 0
    return avg
}

function calculateCubicWeight(objs) {
    objs.map(obj => {
        if (obj.category === 'Air Conditioners') {
            const size = obj.size
            const width = size.width
            const length = size.length
            const height = size.height
            const cubic = converttometer(width, length, height)
            const cubicWeight = calculateCubicFactor(cubic)
            cubicObject.push({
                width: width,
                length: length,
                height: height,
                cubicWeight: cubicWeight
            })
        }
        return cubicObject;
    })
}

function converttometer(width, length, height) {

    const meter = 100

    const widh = width / meter
    const lengh = length / meter
    const heigt = height / meter

    const cubic = widh * lengh * heigt
    return cubic
}

function calculateCubicFactor(cubic) {
    const factor = 250
    return cubic * factor
}

function test(hasNext1) {
    store.dispatch((dispatch) => {
        dispatch({ type: 'FETCH_USERS_START' })

        axios.get('http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com' + endpoint)
            .then((response) => {
                dispatch({ type: 'FETCH_USERS_FULFILLED', payload: response.data });
                if (getData(response.data) === true) {
                    hasNext1 = true
                    test(hasNext1)
                }
            })
            .catch((err) => {
                dispatch({ type: 'FETCH_USERS_REJECTED', payload: err })
            })
    })
}

class RestContainer extends Component {

    render() {
        return (
            <Rest
                value={calculateAverage()}
                onClickUser={() => {
                    let hasNext1 = false
                    test(hasNext1)
                }}

            />
        )
    }
}
export default RestContainer