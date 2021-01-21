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

create table authors
(
	id serial primary key,
	userid int not null
	firstname varchar(25),
	lastname varchar(25),
	avgrating float not null,
	bio varchar(500) not null,
	picture varchar(100) not null
)