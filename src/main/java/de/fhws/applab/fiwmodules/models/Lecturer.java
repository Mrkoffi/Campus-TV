package de.fhws.applab.fiwmodules.models;

import com.owlike.genson.annotation.JsonConverter;
import com.owlike.genson.annotation.JsonIgnore;
import de.fhws.applab.norbury.core.api.converters.LinkConverter;
import de.fhws.applab.norbury.core.models.AbstractModel;
import org.glassfish.jersey.linking.InjectLink;

import javax.ws.rs.core.Link;

/**
 * Created by braunpet on 28.07.15.
 */
public class Lecturer extends AbstractModel implements Cloneable
{
	protected String firstName;

	protected String lastName;

	protected String title;

	protected String urlWelearn;

	protected String email;

	protected String phone;

	protected String urlProfileImage;

	protected String address;

	protected String roomNumber;

	@InjectLink( style = InjectLink.Style.ABSOLUTE, value = "mitarbeiter/${instance.id}", rel = "self" )
	private Link selfUri;

	public Lecturer( )
	{
	}

	public String getFirstName( )
	{
		return this.firstName;
	}

	public void setFirstName( final String firstName )
	{
		this.firstName = firstName;
	}

	public String getLastName( )
	{
		return this.lastName;
	}

	public void setLastName( final String lastName )
	{
		this.lastName = lastName;
	}

	public String getTitle( )
	{
		return this.title;
	}

	public void setTitle( final String title )
	{
		this.title = title;
	}

	public String getUrlWelearn( )
	{
		return this.urlWelearn;
	}

	public void setUrlWelearn( final String urlWelearn )
	{
		this.urlWelearn = urlWelearn;
	}

	public String getEmail( )
	{
		return this.email;
	}

	public void setEmail( final String email )
	{
		this.email = email;
	}

	public String getPhone( )
	{
		return this.phone;
	}

	public void setPhone( final String phone )
	{
		this.phone = phone;
	}

	public String getUrlProfileImage( )
	{
		return this.urlProfileImage;
	}

	public void setUrlProfileImage( final String urlProfileImage )
	{
		this.urlProfileImage = urlProfileImage;
	}

	public String getAddress( )
	{
		return this.address;
	}

	public void setAddress( final String address )
	{
		this.address = address;
	}

	public String getRoomNumber( )
	{
		return this.roomNumber;
	}

	public void setRoomNumber( final String roomNumber )
	{
		this.roomNumber = roomNumber;
	}

	@JsonConverter( LinkConverter.class )
	public Link getSelfUri( )
	{
		return this.selfUri;
	}

	@JsonIgnore
	public void setSelfUri( final Link link )
	{
		this.selfUri = link;
	}

	@Override public boolean equals( final Object o )
	{
		if ( this == o )
			return true;
		if ( o == null || getClass( ) != o.getClass( ) )
			return false;

		final Lecturer lecturer = ( Lecturer ) o;

		if ( this.firstName != null ? !this.firstName.equals( lecturer.firstName ) : lecturer.firstName != null )
			return false;
		if ( this.lastName != null ? !this.lastName.equals( lecturer.lastName ) : lecturer.lastName != null )
			return false;
		if ( this.title != null ? !this.title.equals( lecturer.title ) : lecturer.title != null )
			return false;
		if ( this.urlWelearn != null ? !this.urlWelearn.equals( lecturer.urlWelearn ) : lecturer.urlWelearn != null )
			return false;
		if ( this.email != null ? !this.email.equals( lecturer.email ) : lecturer.email != null )
			return false;
		if ( this.phone != null ? !this.phone.equals( lecturer.phone ) : lecturer.phone != null )
			return false;
		if ( this.urlProfileImage != null ?
			!this.urlProfileImage.equals( lecturer.urlProfileImage ) :
			lecturer.urlProfileImage != null )
			return false;
		if ( this.address != null ? !this.address.equals( lecturer.address ) : lecturer.address != null )
			return false;
		return !( this.roomNumber != null ?
			!this.roomNumber.equals( lecturer.roomNumber ) :
			lecturer.roomNumber != null );

	}

	@Override protected Object clone( ) throws CloneNotSupportedException
	{
		return super.clone( );
	}

	@Override public int hashCode( )
	{
		int result = this.firstName != null ? this.firstName.hashCode( ) : 0;
		result = 31 * result + ( this.lastName != null ? this.lastName.hashCode( ) : 0 );
		result = 31 * result + ( this.title != null ? this.title.hashCode( ) : 0 );
		result = 31 * result + ( this.urlWelearn != null ? this.urlWelearn.hashCode( ) : 0 );
		result = 31 * result + ( this.email != null ? this.email.hashCode( ) : 0 );
		result = 31 * result + ( this.phone != null ? this.phone.hashCode( ) : 0 );
		result = 31 * result + ( this.urlProfileImage != null ? this.urlProfileImage.hashCode( ) : 0 );
		result = 31 * result + ( this.address != null ? this.address.hashCode( ) : 0 );
		result = 31 * result + ( this.roomNumber != null ? this.roomNumber.hashCode( ) : 0 );
		return result;
	}

	@Override public String toString( )
	{
		return "Lecturer{" +
			"firstName='" + this.firstName + '\'' +
			", lastName='" + this.lastName + '\'' +
			", title='" + this.title + '\'' +
			", urlWelearn='" + this.urlWelearn + '\'' +
			", email='" + this.email + '\'' +
			", phone='" + this.phone + '\'' +
			", urlProfileImage='" + this.urlProfileImage + '\'' +
			", address='" + this.address + '\'' +
			", roomNumber='" + this.roomNumber + '\'' +
			'}';
	}
}
