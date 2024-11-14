--
-- PostgreSQL database dump
--

-- Dumped from database version 10.10
-- Dumped by pg_dump version 16.2

-- Started on 2024-10-23 11:21:57

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

SET default_tablespace = '';

--
-- TOC entry 196 (class 1259 OID 205115)
-- Name: anuncio; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.anuncio (
    anu_id integer NOT NULL,
    anu_title character varying(80),
    anu_date date,
    anu_desc text,
    anu_price numeric(10,1),
    cat_id integer,
    usr_id integer
);


ALTER TABLE public.anuncio OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 205121)
-- Name: anuncio_anu_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.anuncio_anu_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.anuncio_anu_id_seq OWNER TO postgres;

--
-- TOC entry 2852 (class 0 OID 0)
-- Dependencies: 197
-- Name: anuncio_anu_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.anuncio_anu_id_seq OWNED BY public.anuncio.anu_id;


--
-- TOC entry 198 (class 1259 OID 205123)
-- Name: categoria; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categoria (
    cat_id integer NOT NULL,
    cat_name character varying(20)
);


ALTER TABLE public.categoria OWNER TO postgres;

--
-- TOC entry 199 (class 1259 OID 205126)
-- Name: categoria_cat_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categoria_cat_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categoria_cat_id_seq OWNER TO postgres;

--
-- TOC entry 2853 (class 0 OID 0)
-- Dependencies: 199
-- Name: categoria_cat_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categoria_cat_id_seq OWNED BY public.categoria.cat_id;


--
-- TOC entry 200 (class 1259 OID 205128)
-- Name: foto_anuncio; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.foto_anuncio (
    fot_id integer NOT NULL,
    fot_file character varying(20),
    anu_id integer
);


ALTER TABLE public.foto_anuncio OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 205131)
-- Name: foto_anuncio_fot_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.foto_anuncio_fot_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.foto_anuncio_fot_id_seq OWNER TO postgres;

--
-- TOC entry 2854 (class 0 OID 0)
-- Dependencies: 201
-- Name: foto_anuncio_fot_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.foto_anuncio_fot_id_seq OWNED BY public.foto_anuncio.fot_id;


--
-- TOC entry 202 (class 1259 OID 205133)
-- Name: pergunta_anuncio; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pergunta_anuncio (
    per_id integer NOT NULL,
    per_text text,
    anu_id integer,
    per_resp text
);


ALTER TABLE public.pergunta_anuncio OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 205139)
-- Name: pergunta_anuncio_per_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pergunta_anuncio_per_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pergunta_anuncio_per_id_seq OWNER TO postgres;

--
-- TOC entry 2855 (class 0 OID 0)
-- Dependencies: 203
-- Name: pergunta_anuncio_per_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pergunta_anuncio_per_id_seq OWNED BY public.pergunta_anuncio.per_id;


--
-- TOC entry 204 (class 1259 OID 205141)
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario (
    usr_id integer NOT NULL,
    usr_name character varying(20),
    usr_pass character varying(10),
    usr_level character varying(1)
);


ALTER TABLE public.usuario OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 205144)
-- Name: usuario_usr_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuario_usr_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuario_usr_id_seq OWNER TO postgres;

--
-- TOC entry 2856 (class 0 OID 0)
-- Dependencies: 205
-- Name: usuario_usr_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuario_usr_id_seq OWNED BY public.usuario.usr_id;


--
-- TOC entry 2696 (class 2604 OID 205146)
-- Name: anuncio anu_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.anuncio ALTER COLUMN anu_id SET DEFAULT nextval('public.anuncio_anu_id_seq'::regclass);


--
-- TOC entry 2697 (class 2604 OID 205147)
-- Name: categoria cat_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categoria ALTER COLUMN cat_id SET DEFAULT nextval('public.categoria_cat_id_seq'::regclass);


--
-- TOC entry 2698 (class 2604 OID 205148)
-- Name: foto_anuncio fot_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.foto_anuncio ALTER COLUMN fot_id SET DEFAULT nextval('public.foto_anuncio_fot_id_seq'::regclass);


--
-- TOC entry 2699 (class 2604 OID 205149)
-- Name: pergunta_anuncio per_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pergunta_anuncio ALTER COLUMN per_id SET DEFAULT nextval('public.pergunta_anuncio_per_id_seq'::regclass);


--
-- TOC entry 2700 (class 2604 OID 205150)
-- Name: usuario usr_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario ALTER COLUMN usr_id SET DEFAULT nextval('public.usuario_usr_id_seq'::regclass);


--
-- TOC entry 2836 (class 0 OID 205115)
-- Dependencies: 196
-- Data for Name: anuncio; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.anuncio VALUES (1, 'Fonte gamer PC', '2024-10-23', 'Vendo fonte usada para PC com 500W em ótimo estado, marca Corsair', 190.0, 1, 2);


--
-- TOC entry 2838 (class 0 OID 205123)
-- Dependencies: 198
-- Data for Name: categoria; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.categoria VALUES (1, 'informática');
INSERT INTO public.categoria VALUES (2, 'livros');
INSERT INTO public.categoria VALUES (4, 'acessorios');
INSERT INTO public.categoria VALUES (3, 'celulares');


--
-- TOC entry 2840 (class 0 OID 205128)
-- Dependencies: 200
-- Data for Name: foto_anuncio; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2842 (class 0 OID 205133)
-- Dependencies: 202
-- Data for Name: pergunta_anuncio; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.pergunta_anuncio VALUES (1, 'Faz desconto à vista?', 1, 'só se for no PIX');
INSERT INTO public.pergunta_anuncio VALUES (2, 'Reserva ela para mim.', 1, 'Feito! Manda o PIX para 18-99987-1569');


--
-- TOC entry 2844 (class 0 OID 205141)
-- Dependencies: 204
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.usuario VALUES (1, 'adm', 'adm123', '1');
INSERT INTO public.usuario VALUES (2, 'jao', 'jao123', '2');


--
-- TOC entry 2857 (class 0 OID 0)
-- Dependencies: 197
-- Name: anuncio_anu_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.anuncio_anu_id_seq', 1, true);


--
-- TOC entry 2858 (class 0 OID 0)
-- Dependencies: 199
-- Name: categoria_cat_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categoria_cat_id_seq', 4, true);


--
-- TOC entry 2859 (class 0 OID 0)
-- Dependencies: 201
-- Name: foto_anuncio_fot_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.foto_anuncio_fot_id_seq', 1, false);


--
-- TOC entry 2860 (class 0 OID 0)
-- Dependencies: 203
-- Name: pergunta_anuncio_per_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pergunta_anuncio_per_id_seq', 2, true);


--
-- TOC entry 2861 (class 0 OID 0)
-- Dependencies: 205
-- Name: usuario_usr_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuario_usr_id_seq', 2, true);


--
-- TOC entry 2702 (class 2606 OID 205152)
-- Name: anuncio anuncio_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.anuncio
    ADD CONSTRAINT anuncio_pkey PRIMARY KEY (anu_id);


--
-- TOC entry 2704 (class 2606 OID 205154)
-- Name: categoria categoria_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT categoria_pkey PRIMARY KEY (cat_id);


--
-- TOC entry 2706 (class 2606 OID 205156)
-- Name: foto_anuncio foto_anuncio_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.foto_anuncio
    ADD CONSTRAINT foto_anuncio_pkey PRIMARY KEY (fot_id);


--
-- TOC entry 2708 (class 2606 OID 205158)
-- Name: pergunta_anuncio pergunta_anuncio_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pergunta_anuncio
    ADD CONSTRAINT pergunta_anuncio_pkey PRIMARY KEY (per_id);


--
-- TOC entry 2710 (class 2606 OID 205160)
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (usr_id);


--
-- TOC entry 2711 (class 2606 OID 205171)
-- Name: anuncio anuncio_cat_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.anuncio
    ADD CONSTRAINT anuncio_cat_id_fkey FOREIGN KEY (cat_id) REFERENCES public.categoria(cat_id) NOT VALID;


--
-- TOC entry 2712 (class 2606 OID 205176)
-- Name: anuncio anuncio_usr_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.anuncio
    ADD CONSTRAINT anuncio_usr_id_fkey FOREIGN KEY (usr_id) REFERENCES public.usuario(usr_id) NOT VALID;


--
-- TOC entry 2713 (class 2606 OID 205161)
-- Name: foto_anuncio foto_anuncio_anu_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.foto_anuncio
    ADD CONSTRAINT foto_anuncio_anu_id_fkey FOREIGN KEY (anu_id) REFERENCES public.anuncio(anu_id);


--
-- TOC entry 2714 (class 2606 OID 205166)
-- Name: pergunta_anuncio pergunta_anuncio_anu_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pergunta_anuncio
    ADD CONSTRAINT pergunta_anuncio_anu_id_fkey FOREIGN KEY (anu_id) REFERENCES public.anuncio(anu_id);


--
-- TOC entry 2851 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2024-10-23 11:21:57

--
-- PostgreSQL database dump complete
--

