// data.js
export const properties = [
    {
        id: '1',
        title: 'Luxury Condo',
        location: 'Miami, FL',
        image: 'images/1.jpg',
        sharePrice: 250,
        availableShares: 3200,
        totalShares: 10000,
        apy: 8.5,
        isTrending: false,
        specs: { beds: 2, baths: 2, sqft: 1200 }
    },
    {
        id: '2',
        title: 'Modern Apartment Complex',
        location: 'Austin, TX',
        image: 'images/2.jpg',
        sharePrice: 180,
        availableShares: 8400,
        totalShares: 15000,
        apy: 9.2,
        isTrending: true,
        specs: { beds: 0, baths: 0, sqft: 0 } 
    },
    {
        id: '3',
        title: 'Executive Villa',
        location: 'Los Angeles, CA',
        image: 'images/3.jpg',
        sharePrice: 420,
        availableShares: 1200,
        totalShares: 8000,
        apy: 7.8,
        isTrending: false,
        specs: { beds: 5, baths: 4, sqft: 5200 }
    },
    {
        id: '4',
        title: 'Downtown Loft',
        location: 'Seattle, WA',
        image: 'images/4.jpg',
        sharePrice: 195,
        availableShares: 5600,
        totalShares: 12000,
        apy: 8.9,
        isTrending: false,
        specs: { beds: 1, baths: 1, sqft: 850 }
    },
    {
        id: '5',
        title: 'Beachfront Property',
        location: 'San Diego, CA',
        image: 'images/5.jpg',
        sharePrice: 380,
        availableShares: 2800,
        totalShares: 9000,
        apy: 9.5,
        isTrending: true,
        specs: { beds: 3, baths: 2, sqft: 2100 }
    },
    {
        id: '6',
        title: 'Urban Townhouse',
        location: 'Denver, CO',
        image: 'images/6.jpg',
        sharePrice: 210,
        availableShares: 6700,
        totalShares: 11000,
        apy: 8.1,
        isTrending: false,
        specs: { beds: 2, baths: 2, sqft: 1400 }
    }
];

export const cities = [
    { name: 'Miami', count: '145 Properties', img: 'images/miami.jpg' },
    { name: 'Austin', count: '98 Properties', img: 'images/austin.jpg' },
    { name: 'Los Angeles', count: '234 Properties', img: 'images/los_angeles.jpg' },
    { name: 'Seattle', count: '112 Properties', img: 'images/seattle.jpg' }
];

export const faqs = [
    { q: "How does fractional real estate investing work?", a: "Fractional real estate investing allows you to buy shares of premium properties for as little as $100. You own a percentage of the property and earn returns through rental income." },
    { q: "What are the minimum investment requirements?", a: "You can start investing with as little as $100 per share." },
    { q: "How do I earn returns on my investments?", a: "Returns are generated from rental income (distributed quarterly) and property value appreciation upon sale." },
    { q: "Can I sell my shares before the property is sold?", a: "Yes, our secondary marketplace allows you to list your shares for sale to other investors." }
];