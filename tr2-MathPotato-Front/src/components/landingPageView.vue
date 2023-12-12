<template>
    <div>
      <div id="background_page" class="flex flex-row justify-content-between h-100vh">
        <!-- Logo a la izquierda -->
        <div class="flex flex-column align-items-center justify-content-center">
          <img v-show="currentLogo === 'logo1'" src="../assets/LePotata.png" alt="logo" class="logo_pos move-forward" />
          <img v-show="currentLogo === 'logo2'" src="../assets/animationPotato.png" alt="logo" class="logo_pos" />
  
          <!-- <span class="text-3xl font-bold">Math Potato</span> -->
        </div>
  
        <!-- Botón "JUGAR!" a la derecha -->
        <div class="flex flex-column align-items-center justify-content-center">
          <Button class="button_game" label="JUGAR!" size="large" />
        </div>
      </div>
        <div class="card flex flex-column align-items-center">
            <div class="flex flex-column align-items-center gap-2">
                <span class="text-xl font-medium">Scroll Down</span>
                <span class="slidedown-icon h-2rem w-2rem bg-primary border-circle inline-flex align-items-center justify-content-center">
                    <i class="pi pi-arrow-down" />
                </span>
            </div>
            <div class="h-30rem"></div>
            <div v-animateonscroll="{ enterClass: 'fadein', leaveClass: 'fadeout' }" class="flex box shadow-4 justify-content-center align-items-center h-10rem w-10rem sm:h-15rem sm:w-15rem border-round animation-duration-1000">
                <span class="text-3xl font-bold">fade-in</span>
            </div>
            <div class="h-30rem"></div>
            <div v-animateonscroll="{ enterClass: 'fadeinleft', leaveClass: 'fadeoutleft' }" class="flex box shadow-4 justify-content-center align-items-center h-10rem w-10rem sm:h-15rem sm:w-15rem border-round animation-duration-1000 animation-ease-in-out">
                <span class="text-3xl font-bold">fade-left</span>
            </div>
            <div class="h-30rem"></div>
            <div v-animateonscroll="{ enterClass: 'fadeinright', leaveClass: 'fadeoutright' }" class="flex box shadow-4 justify-content-center align-items-center h-10rem w-10rem sm:h-15rem sm:w-15rem border-round animation-duration-1000 animation-ease-in-out">
                <span class="text-3xl font-bold">fade-right</span>
            </div>
            <div class="h-30rem"></div>
            <div v-animateonscroll="{ enterClass: 'zoomin', leaveClass: 'fadeout' }" class="flex box shadow-4 justify-content-center align-items-center h-10rem w-10rem sm:h-15rem sm:w-15rem border-round animation-duration-1000">
                <span class="text-3xl font-bold">zoom</span>
            </div>
           
        </div>
    </div>
</template>

<!-- <style scoped>
@keyframes slidedown-icon {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(20px);
    }
}

@keyframes movePotato {
  0%, 100% {
    transform: translateX(20px);
  }

  50% {
    transform: translateX(50px);
  }
}

@keyframes changeLogo {
  0% {
    transform: scaleX(1);
  }

  100% {
    transform: scaleX(0);
  }

}

.slidedown-icon {
    animation: slidedown-icon;
    animation-duration: 3s;
    animation-iteration-count: infinite;
}

.logo_pos {
  position: absolute;
  top: 20%;
  left: 4%;
  width: 700px;
  transform: translate(-50%, -50%);
  animation: movePotato 2s steps(1) infinite;
}


.move-forward {
  animation: movePotato 2s ease-in-out infinite;
}


.button_game {
    position: absolute;
    top: 50%;
    left: 75%;
    transform: translate(-50%, -50%);
    background-image: radial-gradient(var(--primary-300), var(--primary-600));
    color: var(--primary-color-text);
    font-size: 2rem;
    font-weight: bold;
    border-radius: 1rem;
    padding: 1rem 2rem;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}

#background_page {
    background-image: url(../assets/landing_background.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    height: 100vh;
    opacity: 80%;
    width: 99vw;
    z-index: -1;
}

.box {
    background-image: radial-gradient(var(--primary-300), var(--primary-600));
    color: var(--primary-color-text);
}
</style> -->


<style scoped>

/*slidedown-icon*/

@keyframes slidedown-icon {
    0% {
        transform: translateY(0);
    }

    10% {
        transform: translateY(20px);
    }
}
.slidedown-icon {
    animation: slidedown-icon;
    animation-duration: 3s;
    animation-iteration-count: infinite;
}

/*animation potato*/

@keyframes movePotato {
    0% {
        transform: translateX(0);
        content: url('../assets/LePotata.png');
        left: 3%;
    }
    10%{
        transform: translateX(3px);
        content: url('../assets/animationPotato.png');
        left: 6%;
    }
    20%{
        transform: translateX(6px);
        content: url('../assets/LePotata.png');
        left: 9%;
    }
    30%{
        transform: translateX(9px);
        content: url('../assets/animationPotato.png');
        left: 12%;
    }
    40%{
        transform: translateX(12px);
        content: url('../assets/LePotata.png');
        left: 15%;
    }
    50%{
        transform: translateX(15px);
        content: url('../assets/animationPotato.png');
        left: 18%;
    }
    60%{
        transform: translateX(18px);
        content: url('../assets/LePotata.png');
        left: 21%;
    }
    70%{
        transform: translateX(21px);
        content: url('../assets/animationPotato.png');
        left: 24%;
    }
    80%{
        transform: translateX(24px);
        content: url('../assets/LePotata.png');
        left: 27%;
    }
    90%{
        transform: translateX(27px);
        content: url('../assets/animationPotato.png');
        left: 30%;
    }

    100% {
        transform: translateX(30px);
        content: url('../assets/LePotata.png');
        left: 33%;
    }
}

.logo_pos {
    position: absolute;
    top: 20%;
    left: 4%;
    width: 700px;
    transform: translate(-50%, -50%);
    animation: movePotato 8s  infinite;
    animation-timing-function: linear;
    animation-direction: alternate;
}

/* .move-forward {
    animation: movePotato 2s ease-in-out infinite;
} */

.button_game {
    position: absolute;
    top: 50%;
    left: 75%;
    transform: translate(-50%, -50%);
    background-image: radial-gradient(var(--primary-300), var(--primary-600));
    color: var(--primary-color-text);
    font-size: 2rem;
    font-weight: bold;
    border-radius: 1rem;
    padding: 1rem 2rem;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}

#background_page {
    background-image: url(../assets/landing_background.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    height: 100vh;
    opacity: 80%;
    width: 99vw;
    z-index: -1;
}

.box {
    background-image: radial-gradient(var(--primary-300), var(--primary-600));
    color: var(--primary-color-text);
}

</style>

<script>
export default {
    data() {
        return {
            currentLogo: 'logo1',
            isMoving: true
        };
    },
    mounted() {
        setInterval(() => {
            if (this.isMoving) {
                this.currentLogo = this.currentLogo === 'logo1' ? 'logo2' : 'logo1';
            }
        }, 8000);
    },
    methods: {
        stopMoving() {
            this.isMoving = false;
        }
    }
};
</script>
