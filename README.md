# Hytura - High Quality Indoor Plant Care Products

Welcome to the Hytura repository! Hytura is a modern e-commerce web application built with Next.js and Tailwind CSS, integrated with Shopify to offer a seamless shopping experience. Hytura specialises in high-quality indoor plant care products.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Contact](#contact)

## Features

- **Next.js**: A powerful React framework for server-side rendering and static site generation.
- **Shopify Integration**: Robust e-commerce functionality with Shopify's powerful API.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Responsive Design**: Optimized for various screen sizes.
- **High Performance**: Fast load times and smooth interactions.
- **SEO Optimized**: Enhanced search engine visibility.

## Demo

Check out the live demo of Hytura [here](https://hytura-store.vercel.app/).

## Installation

To get started with Hytura store, follow these steps:

1. **Clone the repository:**
    ```sh
    git clone https://github.com/WesDie/hytura-store.git
    cd hytura
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env.local` file in the root directory and add your Shopify credentials:
    ```env
    SHOPIFY_STORE_DOMAIN='your-store.myshopify.com'
    SHOPIFY_STOREFRONT_ACCESS_TOKEN='your-access-token'
    SHOPIFY_ADMIN_API_ACCESS_TOKEN='admin-api-access-token'
    SHOPIFY_STORE_DOMAIN='https://yourstore.myshopify.com/api/version/graphql.json'
    SHOPIFY_ADMIN_DOMAIN='https://yourstore.myshopify.com/admin/api/version'
    ```

4. **Run the development server:**
    ```sh
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

- **Adding Content**: Manage your products, collections, menus and more directly through the Shopify dashboard.
- **Handling Orders:** Process and manage orders through the Shopify admin panel. Integrate additional payment gateways if required.
- **Deploying the Application:** Deploy Hytura using Vercel, Netlify, or any other preferred hosting service. Ensure environment variables are properly configured in the hosting platform.

## Contact

For questions or feedback, feel free to reach out:

- Email: wes.dieleman@gmail.com
- GitHub: [WesDie](https://github.com/WesDie)
