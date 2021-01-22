drop table reviews;
drop table books;
drop table authors;
drop table genres;

create table authors
(
	id serial primary key,
	userid int not null,
	firstname varchar(25),
	lastname varchar(25),
	avgrating float not null,
	bio varchar(500) not null,
	picture varchar(100) not null
);

create table genres
(
	id serial primary key,
	name varchar(25) not null
);

create table books
(
	id serial primary key,
	authorid int not null,
	title varchar(50) not null,
	cover varchar(150) not null,
	blurb varchar(500) not null,
	page_count int not null,
	link varchar(50),
	approved boolean default false,
	genreid int not null,
	constraint fk_authorid foreign key (authorid) references authors (id),
	constraint fk_genreid foreign key (genreid) references genres (id)
);

create table reviews
(
    id serial primary key,
    rating int not null,
    content text not null,
    username varchar(10) not null,
    bookid int not null references books(id) not null,
    approved boolean default false
);

-- Populating with some sample entries, feel free to add/remove
insert into genres (name) values ('action');
insert into genres (name) values ('adventure');
insert into genres (name) values ('nonfiction');
insert into genres (name) values ('classic');
insert into genres (name) values ('fantasy');
insert into genres (name) values ('mystery');
insert into genres (name) values ('romance');
insert into genres (name) values ('sci-fi');
insert into genres (name) values ('young adult');

insert into authors (userid, firstname, lastname, avgrating, bio, picture) values (1, 'Tamora', 'Pierce', 4.5, 'American YA fantasy author', 'temp.com');