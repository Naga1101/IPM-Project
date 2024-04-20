<template>
    <div class="loading-page">
        <h1> A página está a carregar ... </h1>
        <div class="spinner">
            <object class="car" type="image/svg+xml" data="/svgs/carro_loading.svg" alt="carro"></object>
        </div>
    </div>
    
</template>


<style scoped>

    h1 {
        font-weight: 400;
        font-size: 2em;
    }

    .loading-page{
        display: flex;
        position: relative;
        padding: 10px 50px;
        justify-content: center;
        text-align: left;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }

    .spinner {
        display: flex;
        border: 4px solid rgba(0, 0, 0, 0.1);
        border-left-color: var(--color-red);
        border-radius: 50%;
        width: 30vmin;
        height: 30vmin;
        animation: spin 4s linear infinite; /*aplicar animação*/
        align-self: center;
        }

    .car {
        width: 10vmin;
        left: -8vmin;
        position: relative;
        transform: rotate(-90deg) scaleX(-1);
    }

    /* Animation to rotate the spinner */
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }


</style>