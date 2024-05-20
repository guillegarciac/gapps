'use server';
import { NextResponse } from 'next/server';
import connect from '../../../../database/dbconnect.js';
import App from '../../../../database/models/Apps.js';

export const GET = async (req) => {
  try {
    console.log('Connecting to database...');
    await connect();
    console.log('Database connected successfully.');

    console.log('Fetching apps from the database...');
    const apps = await App.find({});
    console.log('Apps fetched successfully.');

    const response = {
      message: 'Apps retrieved successfully',
      data: apps,
    };

    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error('Error accessing the database:', error);
    return new NextResponse(JSON.stringify({ message: error.message }), { status: 500 });
  }
};
