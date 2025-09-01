#!/usr/bin/env node
/**
 * OptiServe AI Chatbot Setup Test
 * This script verifies that all components are properly configured
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 OptiServe AI Chatbot Setup Test\n');

// Test 1: Check environment variables
console.log('✓ Testing environment configuration...');
require('dotenv').config();

const requiredEnvVars = ['GEMINI_API_KEY'];
let envTest = true;

requiredEnvVars.forEach(envVar => {
    if (!process.env[envVar]) {
        console.log(`❌ Missing environment variable: ${envVar}`);
        envTest = false;
    } else {
        console.log(`✓ ${envVar} is set`);
    }
});

if (!envTest) {
    console.log('\n❌ Environment test failed. Please check your .env file.');
    process.exit(1);
}

// Test 2: Check file structure
console.log('\n✓ Testing file structure...');
const requiredFiles = [
    'backend/server.js',
    'frontend/index.html',
    'frontend/css/chat-widget.css',
    'frontend/js/chat-widget.js',
    'package.json'
];

let fileTest = true;

requiredFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        console.log(`✓ ${file} exists`);
    } else {
        console.log(`❌ Missing file: ${file}`);
        fileTest = false;
    }
});

if (!fileTest) {
    console.log('\n❌ File structure test failed. Some required files are missing.');
    process.exit(1);
}

// Test 3: Check dependencies
console.log('\n✓ Testing dependencies...');
const requiredDeps = ['express', 'cors', '@google/generative-ai', 'dotenv'];
let depTest = true;

requiredDeps.forEach(dep => {
    try {
        require(dep);
        console.log(`✓ ${dep} is installed`);
    } catch (error) {
        console.log(`❌ Missing dependency: ${dep}`);
        depTest = false;
    }
});

if (!depTest) {
    console.log('\n❌ Dependency test failed. Run "npm install" to install missing packages.');
    process.exit(1);
}

// Test 4: Test Gemini AI connection
console.log('\n✓ Testing Gemini AI connection...');
async function testGemini() {
    try {
        const { GoogleGenerativeAI } = require('@google/generative-ai');
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        
        const result = await model.generateContent('Hello, this is a test message.');
        const response = await result.response;
        const text = response.text();
        
        if (text && text.length > 0) {
            console.log('✓ Gemini AI connection successful');
            console.log(`✓ Test response: "${text.substring(0, 50)}..."`);
            return true;
        } else {
            throw new Error('Empty response from Gemini AI');
        }
    } catch (error) {
        console.log(`❌ Gemini AI connection failed: ${error.message}`);
        return false;
    }
}

// Test 5: Test server startup
console.log('\n✓ Testing server startup...');
async function testServer() {
    try {
        const express = require('express');
        const cors = require('cors');
        
        const app = express();
        app.use(cors());
        app.use(express.json());
        
        // Test route
        app.get('/test', (req, res) => {
            res.json({ status: 'OK', message: 'Server test successful' });
        });
        
        const server = app.listen(3002, () => {
            console.log('✓ Server startup test successful');
            server.close();
        });
        
        return true;
    } catch (error) {
        console.log(`❌ Server startup test failed: ${error.message}`);
        return false;
    }
}

// Run all tests
async function runTests() {
    console.log('\n📊 Running advanced tests...\n');
    
    const geminiTest = await testGemini();
    const serverTest = await testServer();
    
    console.log('\n' + '='.repeat(50));
    console.log('📋 Test Results Summary:');
    console.log('='.repeat(50));
    console.log(`Environment Variables: ${envTest ? '✓ PASS' : '❌ FAIL'}`);
    console.log(`File Structure: ${fileTest ? '✓ PASS' : '❌ FAIL'}`);
    console.log(`Dependencies: ${depTest ? '✓ PASS' : '❌ FAIL'}`);
    console.log(`Gemini AI Connection: ${geminiTest ? '✓ PASS' : '❌ FAIL'}`);
    console.log(`Server Startup: ${serverTest ? '✓ PASS' : '❌ FAIL'}`);
    
    const allTests = envTest && fileTest && depTest && geminiTest && serverTest;
    
    if (allTests) {
        console.log('\n🎉 All tests passed! Your OptiServe AI chatbot is ready to use.');
        console.log('\n🚀 To start the chatbot server, run:');
        console.log('   npm start');
        console.log('\n🌐 Then open your browser to:');
        console.log('   http://localhost:3001');
    } else {
        console.log('\n❌ Some tests failed. Please fix the issues above before proceeding.');
        process.exit(1);
    }
}

runTests().catch(error => {
    console.error('\n💥 Test execution failed:', error.message);
    process.exit(1);
});
