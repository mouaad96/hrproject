create database hrsystem;

use hrsystem;



CREATE TABLE employeur (
  immatricule INT PRIMARY KEY,
  nomCpt VARCHAR(30),
  mdp VARCHAR(200),
  prenom VARCHAR(30),
  nom VARCHAR(30),
  dateN DATE,
  sexe varchar(20),
  adresse VARCHAR(50),
  tel VARCHAR(20),
  email VARCHAR(40),
  isAdmin BOOLEAN,
  idBureau INT,
  idDes INT,
  echelle INT,
  echelant INT,
  image LONGTEXT,
  etatFam varchar(30),
  FOREIGN KEY (idBureau) REFERENCES bureau(idBureau) ON UPDATE CASCADE,
  FOREIGN KEY (idDes) REFERENCES designation(idDes) ON UPDATE CASCADE,
  FOREIGN KEY (echelle) REFERENCES echelle(echelle) ON UPDATE CASCADE,
  FOREIGN KEY (echelant) REFERENCES echelant(echelant) ON UPDATE CASCADE 
);

 
 select * from employeur;
 
 
 UPDATE employeur
SET image = NULL   -- or a new value
WHERE immatricule = 1111;  
 
create table famille(
idFam varchar(100) primary key,
prenomConj varchar(40),
nomConj varchar(40),
nombreEnf int,
immatricule int,
FOREIGN KEY (immatricule) REFERENCES employeur(immatricule) ON UPDATE CASCADE ON DELETE CASCADE
);

select * from famille;


 SELECT *
        FROM paiment p
        JOIN employeur emp
        ON p.immatricule = emp.immatricule
        WHERE p.immatricule = 897897;

CREATE TABLE bureau (
  idBureau INT PRIMARY KEY,
  intitule VARCHAR(30),
  etagere INT,
  idSd INT,
  FOREIGN KEY (idSd) REFERENCES subDepartement(idSd) ON UPDATE CASCADE ON DELETE CASCADE
);

 

create table designation(
    idDes int primary key,
    nomDes varchar(30)
);

 


create table echelle(
 echelle int primary key
);
create table  echelant(
 echelant int primary key
);

insert into echelle values (9),
							(10),
							(11);
 
insert into echelant values(1),
							(2),
                            (3),
                            (4),
                            (5);


CREATE TABLE presence (
  idPres VARCHAR(80) PRIMARY KEY,
  dateArr datetime,
  datePart datetime,
  immatricule INT,
  FOREIGN KEY (immatricule) REFERENCES employeur(immatricule) ON UPDATE CASCADE ON DELETE CASCADE
);


 


create table conge(
idCong varchar(150) primary key,
motif varchar(80),
dateDebCong DATE,
dateFinCong DATE,
joursCong int,
immatricule INT,
FOREIGN KEY (immatricule) REFERENCES employeur(immatricule) ON UPDATE CASCADE ON DELETE CASCADE
);



CREATE TABLE ferie (
  idfer varchar(100) primary key,
  titre varchar(200),
  dateDebutFerie DATE,
  dateFinFerie DATE
);

CREATE TABLE demandes(
idDem varchar(100) primary key,
demande varchar(100),
motif varchar(150),
dateDem date,
statutDem varchar(20),
immatricule int,
FOREIGN KEY (immatricule) REFERENCES employeur(immatricule) ON UPDATE CASCADE ON DELETE CASCADE
);
 
select * from conge;
select * from ferie;

delete  from conge where immatricule = 5556;


insert into ferie values(1,'jour de bahlawan', '2023-08-01', '2023-08-04');

CREATE TABLE paiment (
  idPaiment varchar(100) PRIMARY KEY,
  NumCompte VARCHAR(40),
  rappelNet DECIMAL,
  netMensuel DECIMAL,
  dateP DATE,
  immatricule INT,
  FOREIGN KEY (immatricule) REFERENCES employeur(immatricule) ON UPDATE CASCADE ON DELETE CASCADE
);

select * from paiment;

 


CREATE TABLE subDepartement (
  idSd INT PRIMARY KEY,
  nomSubDep VARCHAR(30),
  idDep INT,
  FOREIGN KEY (idDep) REFERENCES departement(idDep) ON UPDATE CASCADE ON DELETE CASCADE
);


create table departement(
idDep int primary key,
nomDep varchar(150)
); 

 alter table departement modify column nomDep varchar(150);

insert into subdepartement values(1,'ressources humaines',1);
insert into departement values(1, 'departement ressource humain et hehexd');

use hrsystem;


select * from presence;

 SELECT emp.immatricule, emp.nom, emp.prenom, p.dateArr, p.datePart FROM presence p
 JOIN employeur emp
 ON p.immatricule = emp.immatricule;

select * from subdepartement;

select * from departement;
select * from employeur;
select * from echelle;
select * from echelant;
 select * from designation;
select * from bureau;





SELECT emp.immatricule, emp.prenom, emp.nom, e.echelle, ec.echelant 
            FROM employeur emp
            JOIN echelle e
            ON emp.echelle = e.echelle
            JOIN echelant ec
            ON emp.echelant = ec.echelant;




insert into designation values(2,'cadre 2er grade');

update employeur set isAdmin = 1 where immatricule = 1111;

drop table departement;

DELETE FROM bureau WHERE idBureau = 9;

delete from bureau where idBureau = 0;
  SELECT e.immatricule, e.prenom, e.nom, d.nomDes
  FROM employeur e
  JOIN designation d ON e.idDes = d.idDes;

ALTER TABLE employeur
ALTER COLUMN isAdmin SET DEFAULT 0;