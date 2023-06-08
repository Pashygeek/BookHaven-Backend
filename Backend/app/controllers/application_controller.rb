class ApplicationController < Sinatra::Base
  set :default_content_type, 'application/json'
  
  # Add your routes here
  get "/" do
    { message: "Welcome To BookHaven!" }.to_json
  end

  get '/books' do
    if params[:searchQuery]
    books = Book.includes(:category).where('title LIKE ?', "#{params[:searchQuery]}%")
    else
      books = Book.all.includes(:category)
  end
  books.to_json(include: :category)
end

get '/books/suggestions' do
  if params[:searchQuery]
    suggestions = Book.where('title LIKE ?', "#{params[:searchQuery]}%")
  else
    suggestions=[]
  end
  suggestions.to_json
end

  get '/books/:id' do
    book = Book.find(params[:id])
    book.to_json(include: :category)
  end


  post '/books' do
    book = Book.create(title: params[:title], author: params[:author], description: params[:description], category_id: params[:category_id])
    book.to_json
  end

  put '/books/:id' do
    book = Book.find(params[:id])
    book.update(title: params[:title], author: params[:author], description: params[:description], category_id: params[:category_id])
    book.to_json
  end

  delete '/books/:id' do |id|
    book = Book.find(id)
    book.destroy
    { message: 'Book deleted' }.to_json
  end

  put '/books/:id/rate' do |id|
    book = Book.find(id)
    rating = params[:rating].to_i
    if rating >=1 && rating <= 5
    book.update(rating: rating)
    book.to_json
  else
    { error: 'Invalid rating' }.to_json
  end
end

get '/favorites' do
  favorites = Book.includes(:category).where(favorite: true)
  favorites.to_json(include: :category)
end

put '/books/:id/favorite' do |id|
  book = Book.find(id)
  book.update(favorite: true)
  book.to_json
end

put '/books/:id/unfavorite' do |id|
  book = Book.find(id)
  book.update(favorite: false)
  book.to_json
end

get '/categories' do
  categories = Category.all
  categories.to_json(include: :books)
end

get '/categories/:name' do
  category = Category.find_by(name: params[:name])
  if category
    category_with_books = category.as_json(include: :books)
    category_with_books.to_json
  else
    { error: 'Category not found' }.to_json
  end
end

post '/categories' do
  category = Category.create(name: params[:name])
  category.to_json
end

put '/categories/:id' do |id|
  category = Category.find(id)
  category.update(name: params[:name])
  category.to_json
end

delete '/categories/:id' do |id|
  category = Category.find(id)
  category.destroy
  { message: 'Category deleted' }.to_json
  end
end
