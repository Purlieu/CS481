# CS481
Server and Client code for a personal beverage database

Thanks to Medium.com for the JWT, React, Django authentication instructions seen here

https://medium.com/netscape/full-stack-django-quick-start-with-jwt-auth-and-react-redux-part-i-37853685ab57

Thanks to Christopher Magnuson for the help on the front end React portion seen here

https://github.com/holyzala/cs481

## Requirements
[Python 3](https://www.python.org/downloads)

[Pipenv](https://docs.pipenv.org)

[git](https://git-scm.com/downloads)

[nodejs](https://nodejs.org/en/download)

## Get the project
```
> git clone git@github.com:holyzala/CS481.git
> cd CS481
```

### Instructions to run the server
```
> cd server
> pipenv install
> pipenv shell
> python manage.py migrate
> python manage.py createsuperuser
> python manage.py runserver
```
### Instructions to run the client
```
> cd client
> npm install
> npm run start
```
### Search Instructions
```
> After loggin in, select "Add Cocktail"
> Type in any letter or word corresponding to a beverage, i.e. "vodka"
> View contents of item by clicking on image
> Add Item to your collection
> Item contents may be viewed by clicking on image in "Add Cocktail" page
```
