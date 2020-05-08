<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper" @click="$emit('close')">
                <div class="modal-container" @click.stop>

                    <div class="modal-header">
                        <slot name="header">
                            default header
                        </slot>
                        <div class="close-icon" @click="$emit('close')">
                            <polaris-icon :source="cancelSmall"></polaris-icon>
                        </div>
                    </div>

                    <div class="modal-body">
                        <slot name="body">
                            default body
                        </slot>
                    </div>

                    <div class="modal-footer" v-if="hasFooter">
                        <slot name="footer">
                            default footer
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>


<script>
    import PolarisIcon from './PolarisIcon.vue';
    import cancelSmall from '../resources/cancel-small.svg';
    export default {
        mounted(){
          console.log( 'Modal Mounted V2' );
        },
        components: {
            PolarisIcon
        },
        props: {
            hasFooter: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                cancelSmall: cancelSmall
            };
        },
        methods: {

        }
    };
</script>
<style>
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(33,43,54,.4);
        animation: fade-in .2s 1 forwards;
        display: table;
        transition: opacity .3s ease;
    }
    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }
    .modal-container {
        width: 100vw;
        max-width: 62rem;
        margin: 0px auto;
        padding: 0;
        border-radius: 6px;
        background: #fff;
        box-shadow: 0 31px 41px 0 rgba(32,42,53,.2), 0 2px 16px 0 rgba(32,42,54,.08);
        transition: all .3s ease;
    }
    .modal-header {
        padding: 1.6rem 2rem;
        border-bottom: .1rem solid #dfe3e8;
        font-size: 2rem;
        line-height: 2.8rem;
        font-weight: 400;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .modal-body {
        padding: 2rem 2rem 1.6rem 2rem;
    }
    .modal-footer {
        display: flex;
        align-items: center;
        width: 100%;
        min-height: 6.4rem;
        padding: 1.6rem;;
        justify-content: flex-end;
        border-top: .1rem solid #dfe3e8;
    }
    .modal-default-button {
        float: right;
    }
    .close-icon {
        cursor: pointer;
    }
    /*
	 * The following styles are auto-applied to elements with
	 * transition="modal" when their visibility is toggled
	 * by Vue.js.
	 *
	 * You can easily play with the modal transition by editing
	 * these styles.
	 */
    .modal-enter {
        opacity: 0;
    }
    .modal-leave-active {
        opacity: 0;
    }
    .modal-enter .modal-mask,
    .modal-leave-active .modal-mask {
        opacity: 0;
    }
    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        opacity: 0;
        transform: translateY(200px);
    }
    @keyframes fade-in {
        0% {
            opacity: 0
        }
        to {
            opacity: 1
        }
    }
</style>
