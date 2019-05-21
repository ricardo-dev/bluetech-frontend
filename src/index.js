import React, {Component} from 'react';
import {YellowBox} from 'react-native';
import './config/config';
import Routes from './routes';

YellowBox.ignoreWarnings([''])
const App = ()=> <Routes />

export default App;