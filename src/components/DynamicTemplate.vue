<script>
export default {
    name: 'DynamicTemplate',
    render(createElement) {
        var validSlot = this.$slots.active;
        if (validSlot) {
            return validSlot[0];
        } else {
            return createElement('div');
        }
    },
    props: {
    }
}
</script>
