# Install django

$ git clone https://github.com/ocobacho/django-recruter.git

$ cd django-recruter

$ virtualenv venv

$ source venv/bin/activate

$ python manage.py migrate --setting=conf.settings.base

$ python manage.py runser --setting=conf.settings.base

# Install react

$ cd frontendjs

$ yarn 

$ yarn start


# Ejercicio para diagnóstico

Se desea elaborar un sistema que permita a una compañía de desarrollo de software, incluir nuevos programadores en su equipo a partir de una convocatoria. De los candidatos presentados se deben registrar los siguientes datos: Nombre y Apellidos, CI, dirección actual, edad y sexo. Además, el sistema debe permitir especificar las tecnologías que domina cada candidato y los años de experiencia en cada una. Las tecnologías más utilizadas en la empresa son: 

- Angular
- Vue
- React native
- CSS
- Sprintboot
- Odoo
- React
- Flutter
- Python
- HTML
- AWS

Además de la gestión de candidatos, se requiere que el sistema genere reportes dinámicos, que permitan conocer dada la tecnología seleccionada, una lista de candidatos que la dominan ordenados descendentemente por los años de experiencia.
# Requisitos
- gestionar convocatorias
- gestionar candidatos
- gestionar las technologias y anos de experiencias de un candidato
- convertir los candidatos en desarrolladores de la empresa
- generar reporte de candidatos segun technologia ordenada descendentemente por anos de experiencia