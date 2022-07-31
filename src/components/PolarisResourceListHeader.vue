<template>
    <div>
        <div class="Polaris-ResourceList__HeaderOuterWrapper Polaris-ResourceList__HeaderWrapper--hasSelect">
            <div>
                <div>
                    <div class="Polaris-ResourceList__HeaderWrapper">
                        <div class="Polaris-ResourceList__HeaderContentWrapper">
                            <div class="Polaris-ResourceList__HeaderTitleWrapper">Showing 2 customers</div>
                            <div class="Polaris-ResourceList__CheckableButtonWrapper">
                                <div class="Polaris-ResourceList-CheckableButton Polaris-ResourceList-CheckableButton__CheckableButton--plain">
                                    <div class="Polaris-ResourceList-CheckableButton__Checkbox">
                                        <label class="Polaris-Choice Polaris-Choice--labelHidden" for="PolarisCheckbox1">
                                            <span class="Polaris-Choice__Control">
                                                <span class="Polaris-Checkbox">
                                                    <input id="PolarisCheckbox1" type="checkbox" class="Polaris-Checkbox__Input" aria-invalid="false" role="checkbox" aria-checked="false" value="">
                                                    <span class="Polaris-Checkbox__Backdrop"></span><span class="Polaris-Checkbox__Icon"><span class="Polaris-Icon">
                                                    <svg viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true">
                                                        <path d="M8.315 13.859l-3.182-3.417a.506.506 0 0 1 0-.684l.643-.683a.437.437 0 0 1 .642 0l2.22 2.393 4.942-5.327a.437.437 0 0 1
                                                        .643 0l.643.684a.504.504 0 0 1 0 .683l-5.91 6.35a.437.437 0 0 1-.642 0"></path></svg></span></span></span></span>
                                            <span class="Polaris-Choice__Label">Select all 2 customers</span></label>
                                    </div>
                                    <span class="Polaris-ResourceList-CheckableButton__Label">Showing 2 customers</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import PolarisResourceListItem from './PolarisResourceListItem.vue';
    import PolarisCheckbox from "./PolarisCheckbox.vue";
    import PolarisButton from "./PolarisButton.vue";

    export default {
        name: "PolarisResourceListHeader",
        created(){

        },
        components: {
            PolarisButton,
            PolarisCheckbox,
            PolarisResourceListItem,
        },
        props: {
        },
        methods: {

        },
        computed: {
        }
    };
</script>
<style>
    .Polaris-ResourceList__HeaderOuterWrapper {
        position: relative;
        background-color: #fff;
        z-index: 2;
    }
    .Polaris-ResourceList__HeaderWrapper {
        position: relative;
        display: flex;
        align-items: flex-start;
        width: 100%;
        min-height: 5.6rem;
        padding: 1rem 1.2rem;
        background-color: #fff;
    }
    .Polaris-ResourceList__HeaderContentWrapper {
        position: absolute;
        z-index: 1;
        right: 1.2rem;
        left: 1.2rem;
        display: flex;
        min-height: 3.6rem;
        opacity: 1;
        transition: opacity .2s cubic-bezier(.64,0,.35,1);
    }
    .Polaris-ResourceList__HeaderTitleWrapper {
        white-space: nowrap;
        text-overflow: ellipsis;
        flex: 1 1;
        padding-left: .4rem;
        align-self: center;
    }
    .Polaris-ResourceList__CheckableButtonWrapper {
        display: none;
    }
    .Polaris-ResourceList-CheckableButton.Polaris-ResourceList-CheckableButton__CheckableButton--plain {
        border: .1rem solid transparent;
        border-radius: 3px;
        box-shadow: none;
        background: transparent;
    }
    .Polaris-ResourceList-CheckableButton {
        font-size: 1.5rem;
        font-weight: 400;
        line-height: 1.6rem;
        text-transform: none;
        letter-spacing: normal;
        display: flex;
        align-items: center;
        min-height: 3.6rem;
        min-width: 3.6rem;
        margin: 0;
        padding: .7rem 1.6rem;
        line-height: 1;
        cursor: pointer;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
        text-decoration: none;
        text-align: left;
        background: transparent;
        border: .1rem solid #c4cdd5;
        border-radius: 3px;
        width: 100%;
        box-shadow: 0 1px 0 0 rgba(22,29,37,.05);
    }
    .Polaris-ResourceList-CheckableButton__Checkbox {
        pointer-events: none;
        height: 1.6rem;
        width: 1.6rem;
        margin-left: -.9rem;
    }
    .Polaris-ResourceList-CheckableButton__Label {
        margin-left: 2rem;
        flex: 1 1;
        white-space: nowrap;
        overflow: hidden;
        max-width: 100%;
        text-overflow: ellipsis;
        padding: .1rem 0;
    }
    .Polaris-Choice--labelHidden {
        padding: 0 !important;
    }
    @media (min-width: 28.625em){
        .Polaris-ResourceList__HeaderWrapper {
            flex-direction: row;
            padding: 1rem 1.6rem;
        }
        .Polaris-ResourceList__HeaderContentWrapper {
            right: 1.6rem;
            left: 1.6rem;
            align-self: flex-start;
        }
        .Polaris-ResourceList__HeaderWrapper--hasAlternateTool.Polaris-ResourceList__HeaderWrapper--hasSelect .Polaris-ResourceList__HeaderTitleWrapper,
        .Polaris-ResourceList__HeaderWrapper--hasSelect .Polaris-ResourceList__HeaderTitleWrapper,
        .Polaris-ResourceList__HeaderWrapper--hasSort.Polaris-ResourceList__HeaderWrapper--hasSelect .Polaris-ResourceList__HeaderTitleWrapper {
            display: none;
        }
        .Polaris-ResourceList__CheckableButtonWrapper {
            flex: 1 1;
            display: block;
        }
        .Polaris-ResourceList-CheckableButton {
            flex: 0 1 auto;
        }
    }
</style>
