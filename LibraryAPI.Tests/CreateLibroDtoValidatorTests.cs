using LibraryAPI.Domain.DTOs;
using LibraryAPI.Infrastructure.Validators;
using FluentAssertions;
using FluentValidation.TestHelper;

namespace LibraryAPI.Tests.Validators
{
    public class CreateLibroDtoValidatorTests
    {
        private readonly CreateLibroDtoValidator _validator;

        public CreateLibroDtoValidatorTests()
        {
            _validator = new CreateLibroDtoValidator();
        }

        [Fact]
        public void Should_HaveError_When_TituloIsEmpty()
        {
            // Arrange
            var dto = new CreateLibroDto
            {
                Titulo = "",
                Autor = "Autor Test",
                Descripcion = "Descripción test",
                Genero = "Ficción",
                FechaPublicacion = new DateOnly(2020, 1, 1)
            };

            // Act
            var result = _validator.TestValidate(dto);

            // Assert
            result.ShouldHaveValidationErrorFor(x => x.Titulo);
        }

        [Fact]
        public void Should_HaveError_When_TituloExceedsMaxLength()
        {
            // Arrange
            var dto = new CreateLibroDto
            {
                Titulo = new string('a', 201),
                Autor = "Autor Test",
                Descripcion = "Descripción test",
                Genero = "Ficción",
                FechaPublicacion = new DateOnly(2020, 1, 1)
            };

            // Act
            var result = _validator.TestValidate(dto);

            // Assert
            result.ShouldHaveValidationErrorFor(x => x.Titulo);
        }

        [Fact]
        public void Should_HaveError_When_AutorIsEmpty()
        {
            // Arrange
            var dto = new CreateLibroDto
            {
                Titulo = "Título Test",
                Autor = "",
                Descripcion = "Descripción test",
                Genero = "Ficción",
                FechaPublicacion = new DateOnly(2020, 1, 1)
            };

            // Act
            var result = _validator.TestValidate(dto);

            // Assert
            result.ShouldHaveValidationErrorFor(x => x.Autor);
        }

        [Fact]
        public void Should_HaveError_When_FechaPublicacionIsFuture()
        {
            // Arrange
            var dto = new CreateLibroDto
            {
                Titulo = "Título Test",
                Autor = "Autor Test",
                Descripcion = "Descripción test",
                Genero = "Ficción",
                FechaPublicacion = DateOnly.FromDateTime(DateTime.Today.AddDays(1))
            };

            // Act
            var result = _validator.TestValidate(dto);

            // Assert
            result.ShouldHaveValidationErrorFor(x => x.FechaPublicacion);
        }

        [Fact]
        public void Should_NotHaveError_When_DtoIsValid()
        {
            // Arrange
            var dto = new CreateLibroDto
            {
                Titulo = "Título Test",
                Autor = "Autor Test",
                Descripcion = "Descripción test",
                Genero = "Ficción",
                FechaPublicacion = new DateOnly(2020, 1, 1)
            };

            // Act
            var result = _validator.TestValidate(dto);

            // Assert
            result.ShouldNotHaveAnyValidationErrors();
        }
    }
}
