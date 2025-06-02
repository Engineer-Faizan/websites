document.getElementById('cakeForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page reload

    // Get form values
    const cakeSize = document.getElementById('cakeSize');
    const cakeFlavor = document.getElementById('cakeFlavor');
    const frostingType = document.getElementById('frostingType');
    const specialMessage = document.getElementById('specialMessage');

    // Initialize total cost
    let totalCost = 0;

    // Get selected cake size price
    const cakeSizePrice = parseFloat(cakeSize.options[cakeSize.selectedIndex].getAttribute('data-price'));
    totalCost += cakeSizePrice;

    // Get selected cake flavor price
    const cakeFlavorPrice = parseFloat(cakeFlavor.options[cakeFlavor.selectedIndex].getAttribute('data-price'));
    totalCost += cakeFlavorPrice;

    // Get selected frosting price
    const frostingTypePrice = parseFloat(frostingType.options[frostingType.selectedIndex].getAttribute('data-price'));
    totalCost += frostingTypePrice;

    // Get selected decorations prices
    const decorations = [];
    let decorationsPrice = 0;
    if (document.getElementById('edibleFlowers').checked) {
        decorations.push('Edible Flowers');
        decorationsPrice += parseFloat(document.getElementById('edibleFlowers').getAttribute('data-price'));
    }
    if (document.getElementById('sprinkles').checked) {
        decorations.push('Sprinkles');
        decorationsPrice += parseFloat(document.getElementById('sprinkles').getAttribute('data-price'));
    }
    if (document.getElementById('customToppers').checked) {
        decorations.push('Custom Toppers');
        decorationsPrice += parseFloat(document.getElementById('customToppers').getAttribute('data-price'));
    }
    totalCost += decorationsPrice;

    // Prepare the summary text
    let summaryText = `
        <h2>Summary:</h2>
        <p><strong>Cake Size:</strong> ${cakeSize.value} inches ($${cakeSizePrice})</p>
        <p><strong>Cake Flavor:</strong> ${cakeFlavor.value} (+$${cakeFlavorPrice})</p>
        <p><strong>Frosting Type:</strong> ${frostingType.value} (+$${frostingTypePrice})</p>
        <p><strong>Special Message:</strong> ${specialMessage.value ? specialMessage.value : 'No message added'}</p>
        <p><strong>Decorations:</strong> ${decorations.length > 0 ? decorations.join(', ') : 'No decorations'} (+$${decorationsPrice})</p>
    `;
    summaryText += `<h3>Total Cost: $${totalCost.toFixed(2)}</h3>`;
    let cart = [];
let total = 0;

function addToCart(name, price) {
    cart.push({ name, price });
    total += price;

    // Update cart count
    document.getElementById('cart-count').innerText = cart.length;

    // Update cart UI
    updateCartUI();
}

function toggleCart() {
    const cartSection = document.getElementById('cart-section');
    if (cartSection.style.display === 'none' || cartSection.style.display === '') {
        cartSection.style.display = 'block';
    } else {
        cartSection.style.display = 'none';
    }
}

function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerText = `${item.name} - $${item.price.toFixed(2)}`;
        cartItems.appendChild(li);
    });

    document.getElementById('total-price').innerText = total.toFixed(2);
}


    // Display the summary and total cost
    document.getElementById('summary').innerHTML = summaryText;
});
