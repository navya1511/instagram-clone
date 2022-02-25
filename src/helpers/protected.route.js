import PropTypes from "prop-types"
import React from "react"
import {  Navigate  } from "react-router-dom"
import * as ROUTES from "../constants/routes"

export default function ProtectedRoutes({user , children }){
        
            
            if(!user){
                return (
                    <Navigate 
                     replace
                     to={{
                        pathname: ROUTES.LOGIN,
                      }}
                    />
                )
            }
            return children;
        }

        
        


ProtectedRoutes.propTypes={
    user:PropTypes.object,
    children:PropTypes.object.isRequired
}