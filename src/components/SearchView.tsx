import React from 'react';
import { MOCK_CATEGORIES } from '../constants';
import MainHeader from './MainHeader';

export default function SearchView() {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide bg-spotify-black content-gradient pb-20">
      <MainHeader />
      
      <main className="px-8 mt-4">
        <h1 className="text-3xl font-black mb-8 tracking-tight">Browse all</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {MOCK_CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:brightness-110 transition-all p-4"
              style={{ backgroundColor: category.color }}
            >
              <h3 className="text-2xl font-bold">{category.name}</h3>
              <img
                src={category.imageUrl}
                alt={category.name}
                className="absolute bottom-[-10px] right-[-10px] w-28 h-28 rotate-[25deg] shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
