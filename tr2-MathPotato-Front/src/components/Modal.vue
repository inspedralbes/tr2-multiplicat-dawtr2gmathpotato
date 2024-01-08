<template>
    <div class="modal">
      <div class="content">
        <div class="left-section">
          <img src="@/assets/welcome_image.png" alt="Welcome Image" />
        </div>
        <div class="right-section">
          <h1>{{ currentExplanation.title }}</h1>
          <p>{{ currentExplanation.content }}</p>
          <button @click="nextExplanation">Siguiente</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        explanations: [
          { title: 'Bienvenido al Juego', content: '¡Prepárate para disfrutar de la experiencia!' },
          // Agrega más explicaciones según sea necesario
        ],
        currentExplanationIndex: 0,
      };
    },
    computed: {
      currentExplanation() {
        return this.explanations[this.currentExplanationIndex];
      },
    },
    methods: {
      nextExplanation() {
        if (this.currentExplanationIndex < this.explanations.length - 1) {
          this.currentExplanationIndex++;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    text-align: center;
  }
  
  .content {
    display: flex;
  }
  
  .left-section {
    flex: 1;
    padding: 0 10px;
  }
  
  .left-section img {
    max-width: 100%;
    height: auto;
  }
  
  .right-section {
    flex: 2;
    padding: 0 10px;
  }
  
  .right-section h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  .right-section p {
    font-size: 18px;
    margin-bottom: 20px;
  }
  
  .right-section button {
    background-color: #4caf50;
    color: #fff;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
  }
  </style>
  