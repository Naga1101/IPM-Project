<template>
    <div class="clock">
        <object class="clock-image" type="image/svg+xml" data="/svgs/clock.svg"></object>
        <div class ="text">
            <span class="text-date"> DATA: {{ currentDate }}</span>
            <span class="text-date"> {{ currentTime }}</span>
        </div>
    </div>
  </template>

<script>
    export default {
        data() {
            return {
                currentDate: new Date().toLocaleDateString(),
                currentTime: ""
            };
        },
        mounted() {
            this.updateTime();
            // repetir a cada 1000ms = 1s
            setInterval(this.updateTime, 1000);
        },
        methods: {
            updateTime() {
                this.currentTime = new Date().toLocaleTimeString();
            }
        }
    };
 </script>

<style scoped>
    .clock {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .text{
        display: flex;
        flex-direction: column;
        font-size: 1.2em;
        font-weight: 400;
        color: var(--text-darker-grey);
        line-height: 130%;
        margin-left: 25px;
    }

    .text-date{
        display: flex;
        justify-content: right;

    }
    .clock-image {
        height: 3.2em;
        object-fit: contain;
    }
</style>