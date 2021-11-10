import { Box, Flex, Image as ChakraImage, Divider, Text, Button, Stack, Heading, StackDivider} from '@chakra-ui/react'


import SwiperCore, { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image'
import "swiper/css";
import Link from 'next/link'
import {useState} from 'react'







type Anuncio = {
    id: string;
    name: string;
    ano_fabricacao: string;
    marca_name: string;
    modelo: string;
    versao: string;
    numero_portas: string;
    cor: string;
    cores_internas: string;
    combustivel: string;
    carroceria: string;
    potencia: string;
    transmissao: string;
    quilometragem: string;
    condicao: string;
    valor: string;
    chave_copia: string;
    laudo_cautelar: string;
    manual_do_proprietario: string;
    opcionais: string[];
    data_de_criacao: Date;
    image: string[];
    slug: string;
}

interface AnuncioProps {
    anuncios: Anuncio[]
}

export default function VehicleSection({anuncios}: AnuncioProps) {


    return (
        <Stack>
            {anuncios.map(anuncio => (
                <Text>{anuncio.name}</Text>
            ))}
        </Stack>
    )
}