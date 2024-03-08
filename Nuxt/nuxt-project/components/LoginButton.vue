<template>
  <button @click="$emit('click')">
    <slot>Log In</slot>
  </button>
</template>