
# Guía de Integración con Supabase

Este documento explica cómo conectar tu proyecto de HipHop Platform a una instancia de Supabase para habilitar la persistencia de datos, autenticación y almacenamiento de archivos.

## Prerrequisitos

- Una cuenta de Supabase. Si no tienes una, puedes crearla en [supabase.com](https://supabase.com/).
- Un proyecto de Supabase creado.

## Pasos para la Conexión

### 1. Configurar las Variables de Entorno

1.  Ve al dashboard de tu proyecto en Supabase.
2.  Navega a **Project Settings** (el ícono de engranaje) > **API**.
3.  En esta página, encontrarás la **URL del Proyecto** y la **Clave `anon` (pública)**.
4.  Crea un archivo `.env` en la raíz de tu proyecto (si no existe) copiando el contenido de `.env.example`.
5.  Actualiza el archivo `.env` con los valores de tu proyecto Supabase:

    ```env
    VITE_DATA_PROVIDER=supabase
    VITE_SUPABASE_URL=TU_URL_DE_SUPABASE
    VITE_SUPABASE_ANON_KEY=TU_CLAVE_ANON_PUBLICA
    ```

    **Importante:** Cambia `VITE_DATA_PROVIDER` de `memory` a `supabase` para activar el `SupabaseAdapter`.

### 2. Ejecutar las Migraciones de la Base de Datos

1.  Abre el **Editor SQL** en tu dashboard de Supabase.
2.  Copia el contenido del archivo `supabase/schema.sql` que se encuentra en este proyecto.
3.  Pega el SQL en el editor y ejecútalo para crear todas las tablas necesarias para la aplicación.

### 3. Habilitar la Autenticación

1.  En tu dashboard de Supabase, navega a **Authentication** (el ícono de usuarios).
2.  En la sección **Providers**, habilita los proveedores de autenticación que desees usar (por ejemplo, Email, Google, etc.). Para empezar, se recomienda habilitar **Email**.
3.  Si usas autenticación por email, puedes configurar las plantillas de correo electrónico en la sección **Templates**.

### 4. Configurar el Almacenamiento (Storage)

1.  En tu dashboard de Supabase, navega a **Storage** (el ícono de balde).
2.  Crea los "buckets" necesarios para almacenar los archivos de la aplicación. Se recomiendan los siguientes buckets con acceso público:
    -   `avatars`: para las fotos de perfil de los usuarios.
    -   `banners`: para los banners de perfil de los artistas.
    -   `covers`: para las portadas de tracks, álbumes y playlists.
    -   `tracks`: para los archivos de audio.
    -   `videos`: para los archivos de video.

    Para crear un bucket, haz clic en "New bucket", dale un nombre y marca la casilla "This bucket is public".

### 5. Configurar la Seguridad (RLS) - Opcional pero Recomendado

1.  Row Level Security (RLS) es una característica de PostgreSQL que te permite controlar quién puede acceder y modificar tus datos a nivel de fila.
2.  Ve al **Editor SQL** en tu dashboard de Supabase.
3.  Copia el contenido del archivo `supabase/rls.sql`.
4.  Descomenta las políticas que deseas aplicar y ejecútalas en el editor.
5.  **MUY IMPORTANTE:** Para que las políticas de RLS tengan efecto, debes habilitar RLS en cada tabla. Puedes hacerlo desde la UI de Supabase en **Authentication** > **Policies** o ejecutando el comando SQL: `ALTER TABLE nombre_de_la_tabla ENABLE ROW LEVEL SECURITY;`.

## ¡Listo!

Una vez completados estos pasos, reinicia tu aplicación (`npm run dev`). La aplicación ahora debería estar usando Supabase para todas las operaciones de datos, autenticación y almacenamiento.
