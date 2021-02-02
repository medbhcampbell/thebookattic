drop table if exists reviews;
drop table if exists toread;
drop table if exists haveread;
drop table if exists books;
drop table if exists genres;
drop table if exists authors;

create table authors
(
	id serial primary key,
	userid varchar(25) not null,
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
	rating float default 0,
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
    username varchar(25) not null,
    bookid int not null references books(id) not null,
    approved boolean default false
);

create table toread
(
	username varchar(25) not null,
	bookid int not null,
	primary key(username, bookid),
	constraint fk_bookid foreign key (bookid) references books (id)
);

create table haveread
(
	username varchar(25) not null,
	bookid int not null,
	primary key(username, bookid),
	constraint fk_bookid foreign key (bookid) references books (id)
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
insert into genres (name) values ('horror');

insert into authors (userid, firstname, lastname, avgrating, bio, picture) values ('jausten', 'Jane', 'Austen', '4.5', 'English romance author for the gentry', 'url');
insert into authors (userid, firstname, lastname, avgrating, bio, picture) values ('wshakespeare', 'William', 'Shakespeare', '2.7', 'Some unpopular English scriptwriter', 'url');
insert into authors (userid, firstname, lastname, avgrating, bio, picture) values ('ltolstoy', 'Leo', 'Tolstoy', '4.8', 'Russian author who writes sad, preachy stories', 'url');
insert into authors (userid, firstname, lastname, avgrating, bio, picture) values ('sking', 'Stephen', 'King', '4.5', 'Writes scary stuff', 'url');
insert into authors (userid, firstname, lastname, avgrating, bio, picture) values ('rdahl', 'Roald', 'Dahl', '4.6', 'Likes traumatizing children', 'url');

-- Population some books
insert into books (authorid, title, cover, blurb, page_count, genreid) values
	((select id from authors where lastname like 'Austen'),
	'Pride and Prejudice',
	'url',
	'Will-they-wont-they in petticoats',
	'350',
	(select id from genres where name like 'romance'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'Shakespeare'),
	'The Tempest',
	'url',
	'Shipwrecks, monsters, and the meaning of humanity',
	'500',
	true,
	(select id from genres where name like 'classic'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'King'),
	'It',
	'url',
	'The OG murderclown, and people fleeing their hometowns',
	'750',
	true,
	(select id from genres where name like 'horror'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'King'),
	'Carrie',
	'url',
	'Being a teenage girl is brutal, but the telekinesis has its use',
	'100',
	true,
	(select id from genres where name like 'horror'));


insert into toread (username, bookid) values ('jausten', 3);
insert into toread (username, bookid) values ('jausten', 4);
insert into toread (username, bookid) values ('wshakespeare', 3);

insert into haveread (username, bookid) values ('wshakespeare', 4);