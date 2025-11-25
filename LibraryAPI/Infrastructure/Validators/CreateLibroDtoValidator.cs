using FluentValidation;
using LibraryAPI.Domain.DTOs;

namespace LibraryAPI.Infrastructure.Validators
{
    public class CreateLibroDtoValidator : AbstractValidator<CreateLibroDto>
    {
        public CreateLibroDtoValidator()
        {
            RuleFor(x => x.Titulo)
                .NotEmpty().WithMessage("El título es requerido")
                .MaximumLength(200).WithMessage("El título no puede exceder los 200 caracteres");

            RuleFor(x => x.Autor)
                .NotEmpty().WithMessage("El autor es requerido")
                .MaximumLength(200).WithMessage("El autor no puede exceder los 200 caracteres");

            RuleFor(x => x.Descripcion)
                .NotEmpty().WithMessage("La descripción es requerida");

            RuleFor(x => x.Genero)
                .MaximumLength(100).WithMessage("El género no puede exceder los 100 caracteres");

            RuleFor(x => x.FechaPublicacion)
                .NotEmpty().WithMessage("La fecha de publicación es requerida")
                .LessThanOrEqualTo(DateOnly.FromDateTime(DateTime.Today))
                .WithMessage("La fecha de publicación no puede ser futura");
        }
    }
}
