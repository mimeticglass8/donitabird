# donitaBird

Using HTML, CSS & JavaScript.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Data Usage](#usage)
- [Acknowledgments](#acknowledgments)

## Introduction

It is a simple bird game that challenges you to score.

## Features

Maintain your scoring streak upto infinity.

## Getting Started

Hi you can can run this site without any restriction, please check for an update if your browser fails to run the application.

### Prerequisites

JS template taken from Forefront Library

### Installation

Play over web or Request for an application with modifications at suitable stores.

### Data Usage

It requires no special permission.

## Acknowledgments

This is the template that is used.


const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Bird
const bird = {
  x: 50,
  y: canvas.height / 2,
  radius: 20,
  velocity: 0,
  gravity: 0.5,
  jump: -10,

  draw: function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.closePath();
  },

  flap: function() {
    this.velocity += this.jump;
  },

  update: function() {
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.y + this.radius > canvas.height) {
      this.y = canvas.height - this.radius;
      this.velocity = 0;
    }

    if (this.y - this.radius < 0) {
      this.y = this.radius;
      this.velocity = 0;
    }
  }
};

// Pipes
const pipes = [];
const pipeGap = 100;
const pipeWidth = 50;
const pipeColor = 'green';
let pipeTimer = 0;

function Pipe() {
  this.top = Math.random() * (canvas.height - pipeGap * 2) + pipeGap;
  this.bottom = canvas.height - this.top - pipeGap;
  this.x = canvas.width;
  this.width = pipeWidth;

  this.draw = function() {
    ctx.fillStyle = pipeColor;
    ctx.fillRect(this.x, 0, this.width, this.top);
    ctx.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom);
  };

  this.update = function() {
    this.x -= 2;
  };
}

function createPipes() {
  if (pipeTimer % 150 === 0) {
    pipes.push(new Pipe());
  }
  pipeTimer++;
}

// Collision detection
function collisionDetection(b, p) {
  if (
    b.x < p.x + p.width &&
    b.x + b.radius > p.x &&
    b.y < p.top ||
    b.y > canvas.height - p.bottom
  ) {
    return true;
  }
  return false;
}

// Point system
let score = 0;

function pointChecker() {
  pipes.forEach(p => {
    if (p.x + p.width < bird.x && !p.passed) {
      p.passed = true;
      score++;
    }
  });
}

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  bird.draw();
  bird.update();

  createPipes();
  pipes.forEach(p => {
    p.draw();
    p.update();
    if (collisionDetection(bird, p)) {
      // Game over logic
    }
  });

  pointChecker();

  // Display score
  ctx.fillStyle = 'black';
  ctx.font = '24px Arial';
  ctx.fillText('Score: ' + score, 10, 30);

  requestAnimationFrame(gameLoop);
}

// Event listeners
document.addEventListener('keydown', function(event) {
  if (event.code === 'Space') {
    bird.flap();
  }
});

gameLoop();
.

# donitabird
